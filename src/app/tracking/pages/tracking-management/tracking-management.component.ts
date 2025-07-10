import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { NgClass, CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import {
  Tracking,
  TrackingGoal,
  MealPlanEntry,
  CreateMealPlanEntryRequest,
  UpdateMealPlanEntryRequest,
  MacronutrientValues
} from '../../model/tracking.entity';
import { TrackingService } from '../../services/tracking.service';
import { TrackingCreateAndEditComponent } from '../../components/tracking-create-and-edit/tracking-create-and-edit.component';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-tracking-management',
  standalone: true,
  imports: [
    MatPaginator,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    TrackingCreateAndEditComponent,
    MatTableModule,
    TranslateModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './tracking-management.component.html',
  styleUrl: './tracking-management.component.css'
})
export class TrackingManagementComponent implements OnInit, AfterViewInit {
  currentTracking: Tracking = new Tracking();
  searchUserId: number = 0;

  selectedTrackingMealEntries: MealPlanEntry[] = [];
  mealEntriesDataSource!: MatTableDataSource<MealPlanEntry>;
  mealEntriesColumns: string[] = [ 'recipeId', 'mealPlanType', 'dayNumber', 'actions'];


  showMealEntryForm: boolean = false;
  editingMealEntry: MealPlanEntry | null = null;

  @ViewChild('mealEntriesPaginator', { static: false }) mealEntriesPaginator!: MatPaginator;

  constructor(private trackingService: TrackingService) {
    this.mealEntriesDataSource = new MatTableDataSource<MealPlanEntry>();
  }

  ngOnInit(): void {
    this.mealEntriesDataSource.data = this.selectedTrackingMealEntries;
  }

  ngAfterViewInit(): void {
    this.mealEntriesDataSource.paginator = this.mealEntriesPaginator;
  }

  private resetState(): void {
    this.currentTracking = new Tracking();
    this.selectedTrackingMealEntries = [];
    this.mealEntriesDataSource.data = [];
    this.showMealEntryForm = false;
    this.editingMealEntry = null;
  }

  private updateConsumedMacros(trackingId: number): void {
    this.trackingService.getConsumedMacros(trackingId)
      .subscribe({
        next: (macros: MacronutrientValues) => {
          this.currentTracking.consumedMacros = macros;
        },
        error: (error) => {
          console.error('Error updating consumed macros:', error);
        }
      });
  }

  private getTrackingByUserId(userId: number): void {
    const tracking$ = this.trackingService.getTrackingByUserId(userId);
    const goal$ = this.trackingService.getTrackingGoalByUserId(userId);

    forkJoin([tracking$, goal$])
      .subscribe({
        next: ([tracking, goal]) => {
          this.currentTracking = tracking;
          this.currentTracking.trackingGoal = {
            id: goal.id,
            name: goal.name || 'Default Goal',
            description: goal.description || '',
            targetCalories: goal.targetMacros?.calories || 0,
            targetProtein: goal.targetMacros?.proteins || 0,
            targetCarbs: goal.targetMacros?.carbs || 0,
            targetFats: goal.targetMacros?.fats || 0,
          };

          this.loadMealPlanEntries(tracking.id);
          this.updateConsumedMacros(tracking.id);
        },
        error: (error) => {
          console.error('Error fetching tracking or tracking goal:', error);
          this.resetState();
        }
      });
  }

  private loadMealPlanEntries(trackingId: number): void {
    this.trackingService.getAllMealsByTrackingId(trackingId)
      .subscribe({
        next: (entries: MealPlanEntry[]) => {
          this.selectedTrackingMealEntries = entries;
          this.mealEntriesDataSource.data = entries;
          this.currentTracking.mealPlanEntries = entries;
        },
        error: (error) => {
          console.error('Error loading meal plan entries:', error);
          this.selectedTrackingMealEntries = [];
          this.mealEntriesDataSource.data = [];
        }
      });
  }

  private addMealPlanEntry(trackingId: number, request: CreateMealPlanEntryRequest): void {
    this.trackingService.createMealPlanEntry(trackingId, request)
      .subscribe({
        next: () => {
          this.loadMealPlanEntries(trackingId);
          this.updateConsumedMacros(trackingId);
          this.showMealEntryForm = false;
          this.editingMealEntry = null;
        },
        error: (error) => {
          console.error('Error adding meal plan entry:', error);
        }
      });
  }

  private updateMealPlanEntry(entryId: number, request: UpdateMealPlanEntryRequest): void {
    this.trackingService.updateMealPlanEntry(entryId, request)
      .subscribe({
        next: () => {
          this.loadMealPlanEntries(this.currentTracking.id);
          this.updateConsumedMacros(this.currentTracking.id);
          this.showMealEntryForm = false;
          this.editingMealEntry = null;
        },
        error: (error) => {
          console.error('Error updating meal plan entry:', error);
        }
      });
  }

  private removeMealPlanEntry(trackingId: number, entryId: number): void {
    this.trackingService.removeMealPlanEntry(trackingId, entryId)
      .subscribe({
        next: () => {
          this.loadMealPlanEntries(trackingId);
          this.updateConsumedMacros(trackingId);
        },
        error: (error) => {
          console.error('Error removing meal plan entry:', error);
        }
      });
  }

  onSearchByUserId(): void {
    if (this.searchUserId && this.searchUserId > 0) {
      this.getTrackingByUserId(this.searchUserId);
    } else {
      console.warn('Please enter a valid user ID');
    }
  }

  onMealPlanEntryAdded(event: any): void {
    if ('trackingId' in event && 'entry' in event) {
      this.addMealPlanEntry(event.trackingId, event.entry);
    } else {
      console.error('Invalid event structure for mealPlanEntryAdded:', event);
    }
  }

  onMealPlanEntryUpdated(event: any): void {
    if ('entryId' in event && 'entry' in event) {
      this.updateMealPlanEntry(event.entryId, event.entry);
    } else {
      console.error('Invalid event structure for mealPlanEntryUpdated:', event);
    }
  }

  onEditCanceled(): void {
    this.showMealEntryForm = false;
    this.editingMealEntry = null;
  }

  showAddMealEntryForm(): void {
    this.showMealEntryForm = true;
    this.editingMealEntry = null;
  }

  onEditMealEntry(entry: MealPlanEntry): void {
    this.editingMealEntry = entry;
    this.showMealEntryForm = true;
  }

  onDeleteMealPlanEntry(entry: MealPlanEntry): void {
    if (confirm(`Are you sure you want to delete the meal entry: ${entry.foodName}?`)) {
      this.removeMealPlanEntry(this.currentTracking.id, entry.id);
    }
  }

  getProgressPercentage(macroType: 'calories' | 'protein' | 'carbs' | 'fats'): number {
    if (!this.currentTracking.consumedMacros || !this.currentTracking.trackingGoal) {
      return 0;
    }

    const consumed = this.currentTracking.consumedMacros[macroType] || 0;
    let target = 0;

    switch (macroType) {
      case 'calories':
        target = this.currentTracking.trackingGoal.targetCalories;
        break;
      case 'protein':
        target = this.currentTracking.trackingGoal.targetProtein;
        break;
      case 'carbs':
        target = this.currentTracking.trackingGoal.targetCarbs;
        break;
      case 'fats':
        target = this.currentTracking.trackingGoal.targetFats;
        break;
    }

    return target > 0 ? Math.min((consumed / target) * 100, 100) : 0;
  }

  clearSearch(): void {
    this.searchUserId = 0;
    this.resetState();
  }
}
