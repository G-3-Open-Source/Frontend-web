import { Component } from '@angular/core';
import { EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from "@angular/forms";
import { MatFormField } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import {Tracking} from '../../model/tracking.entity';

@Component({
  selector: 'app-tracking-create-and-edit',
  imports: [MatFormField, MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './tracking-create-and-edit.component.html',
  styleUrl: './tracking-create-and-edit.component.css'
})
export class TrackingCreateAndEditComponent {
  // Attributes
  @Input() tracking: Tracking;
  @Input() editMode: boolean = false;
  @Output() trackingAdded: EventEmitter<Tracking> = new EventEmitter<Tracking>();
  @Output() trackingUpdated: EventEmitter<Tracking> = new EventEmitter<Tracking>();
  @Output() editCanceled: EventEmitter<any> = new EventEmitter();
  @ViewChild('trackingForm', {static: false}) trackingForm!: NgForm;

  // Methods
  constructor() {
    this.tracking = {} as Tracking;
  }

  // Private methods
  private resetEditState(): void {
    this.tracking = {} as Tracking;
    this.editMode = false;
    this.trackingForm.resetForm();
  }

  // Event Handlers

  onSubmit(): void {
    if (this.trackingForm.form.valid) {
      let emitter: EventEmitter<Tracking> = this.editMode ? this.trackingUpdated : this.trackingAdded;
      emitter.emit(this.tracking);
      this.resetEditState();
    } else {
      console.error('Invalid data in form');
    }
  }

  onCancel(): void {
    this.editCanceled.emit();
    this.resetEditState();
  }
}
