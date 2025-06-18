import { Component } from '@angular/core';
import { EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Recommendation } from "../../model/recommendation.entity";
import { FormsModule, NgForm } from "@angular/forms";
import { MatFormField } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-recommendations-create-and-edit',
  imports: [MatFormField, MatInputModule, MatButtonModule, FormsModule, MatSelectModule,
    MatOptionModule,
    MatFormFieldModule],
  templateUrl: './recommendations-create-and-edit.component.html',
  styleUrl: './recommendations-create-and-edit.component.css'
})
export class RecommendationsCreateAndEditComponent {
  // Attributes
  @Input() recommendation: Recommendation;
  @Input() editMode: boolean = false;
  @Output() recommendationAdded: EventEmitter<Recommendation> = new EventEmitter<Recommendation>();
  @Output() recommendationUpdated: EventEmitter<Recommendation> = new EventEmitter<Recommendation>();
  @Output() editCanceled: EventEmitter<any> = new EventEmitter();
  @ViewChild('recommendationForm', {static: false}) recommendationForm!: NgForm;

  // Methods
  constructor() {
    this.recommendation = {} as Recommendation;
  }

  // Private methods
  private resetEditState(): void {
    this.recommendation = {} as Recommendation;
    this.editMode = false;
    this.recommendationForm.resetForm();
  }

  // Event Handlers
  onSubmit(): void {
    if (this.recommendationForm.form.valid) {
      let emitter: EventEmitter<Recommendation> = this.editMode ? this.recommendationUpdated : this.recommendationAdded;
      emitter.emit(this.recommendation);
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
