import { Component } from '@angular/core';
import { AfterViewInit, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatIconModule } from "@angular/material/icon";
import { NgClass } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import {Tracking} from '../../model/tracking.entity';
import { TrackingService } from '../../services/tracking.service';
import {TrackingCreateAndEditComponent} from '../../components/tracking-create-and-edit/tracking-create-and-edit.component';

@Component({
  selector: 'app-tracking-management',
  imports: [MatPaginator, MatSort, MatIconModule, TrackingCreateAndEditComponent, MatTableModule, NgClass, TranslateModule],
  templateUrl: './tracking-management.component.html',
  styleUrl: './tracking-management.component.css'
})
export class TrackingManagementComponent implements OnInit, AfterViewInit  {
  // Attributes
  trackingData: Tracking;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'date', 'time_of_day', 'quantity', 'notes','recipe_id','user_id','calories','created_at', 'actions'];
  isEditMode: boolean;

  @ViewChild(MatPaginator, { static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false}) sort!: MatSort;

  // Constructor
  constructor(private trackingService: TrackingService) {
    this.isEditMode = false;
    this.trackingData = {} as Tracking;
    this.dataSource = new MatTableDataSource<any>();
  }

  // Private Methods
  private resetEditState(): void {
    this.isEditMode = false;
    this.trackingData = {} as Tracking;
  }

  // CRUD Actions

  private getAllTracking(): void {
    this.trackingService.getAll()
      .subscribe((response: any) => {
        this.dataSource.data = response;
      });
  };

  private createTracking(): void {
    this.trackingService.create(this.trackingData)
      .subscribe((response: any) => {
        this.dataSource.data.push({...response});
        // Actualiza el dataSource.data con los students actuales, para que Angular detecte el cambio y actualice la vista.
        this.dataSource.data = this.dataSource.data
          .map((tracking: Tracking) => {
            return tracking;
          });
      });
  };

  private updateTracking(): void {
    let trackingToUpdate: Tracking = this.trackingData;
    this.trackingService.update(this.trackingData.id, trackingToUpdate)
      .subscribe((response: any) => {
        this.dataSource.data = this.dataSource.data
          .map((tracking: Tracking) => {
            if (tracking.id === response.id) {
              return response;
            }
            return tracking;
          });
      });
  };

  private deleteTracking(trackingId: number): void {
    this.trackingService.delete(trackingId)
      .subscribe(() => {
        this.dataSource.data = this.dataSource.data
          .filter((tracking: Tracking) => {
            return tracking.id !== trackingId ? tracking : false;
          });
      });
  };

  // UI Event Handlers

  onEditItem(element: Tracking) {
    this.isEditMode = true;
    this.trackingData = element;
  }

  onDeleteItem(element: Tracking) {
    this.deleteTracking(element.id);
  }

  onCancelEdit() {
    this.resetEditState();
    this.getAllTracking();
  }

  onTrackingAdded(element: Tracking) {
    this.trackingData = element;
    this.createTracking();
    this.resetEditState();
  }

  onTrackingUpdated(element: Tracking) {
    this.trackingData = element;
    this.updateTracking();
    this.resetEditState();
  }

  // Lifecycle Hooks

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getAllTracking();
  }
}
