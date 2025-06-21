import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from '@angular/material/dialog';
import { Recommendation } from '../../../recomendations/model/recommendation.entity';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-recommendation-form-dialog',
  templateUrl: './recommendation-form-dialog.component.html',
  styleUrls: ['./recommendation-form-dialog.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogContent,
    TranslatePipe
  ]
})
export class RecommendationFormDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<RecommendationFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { recommendation: Recommendation, isEditMode: boolean }
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.dialogRef.close(this.data.recommendation);
  }
}
