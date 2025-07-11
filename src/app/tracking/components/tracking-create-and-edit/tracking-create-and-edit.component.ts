import { Component, EventEmitter, Input, Output, ViewChild, OnInit } from '@angular/core';
import { FormsModule, NgForm } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { CommonModule } from "@angular/common";
import {
  Tracking,
  CreateMealPlanEntryRequest,
  MealPlanEntry
} from '../../model/tracking.entity';

@Component({
  selector: 'app-tracking-create-and-edit',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './tracking-create-and-edit.component.html',
  styleUrl: './tracking-create-and-edit.component.css'
})
export class TrackingCreateAndEditComponent implements OnInit {
  @Input() tracking: Tracking = new Tracking();
  @Input() editingMealEntry: MealPlanEntry | null = null;

  @Output() mealPlanEntryAdded = new EventEmitter<{ trackingId: number, entry: CreateMealPlanEntryRequest }>();
  @Output() mealPlanEntryUpdated = new EventEmitter<{ entryId: number, entry: CreateMealPlanEntryRequest }>();
  @Output() editCanceled = new EventEmitter<void>();

  @ViewChild('mealEntryForm', { static: false }) mealEntryForm!: NgForm;

  mealEntryData: CreateMealPlanEntryRequest = new CreateMealPlanEntryRequest();
  mealTypes: string[] = ['BREAKFAST', 'LUNCH', 'DINNER', 'SNACK'];

  ngOnInit(): void {
    if (this.editingMealEntry) {
      const storedUserId = localStorage.getItem('userId');
      this.mealEntryData = {
        userId: this.editingMealEntry.userId ?? (storedUserId ? parseInt(storedUserId, 10) : 0),
        recipeId: this.editingMealEntry.recipeId ?? 0,
        mealPlanType: this.editingMealEntry.mealType,
        dayNumber: this.editingMealEntry.dayNumber ?? 0
      };
    } else {
      this.resetForm();
    }
  }

  private resetForm(): void {
    this.mealEntryData = new CreateMealPlanEntryRequest();
    this.mealEntryData.userId = this.tracking.userId;
  }

  onSubmitMealEntry(): void {
    if (this.mealEntryForm?.valid) {
      if (this.editingMealEntry) {
        this.mealPlanEntryUpdated.emit({
          entryId: this.editingMealEntry.id,
          entry: this.mealEntryData
        });
      } else {
        this.mealPlanEntryAdded.emit({
          trackingId: this.tracking.id,
          entry: this.mealEntryData
        });
      }
      this.resetForm();
    } else {
      console.error('Invalid data in meal entry form');
    }
  }

  onCancelMealEntry(): void {
    this.editCanceled.emit();
    this.resetForm();
  }
}
