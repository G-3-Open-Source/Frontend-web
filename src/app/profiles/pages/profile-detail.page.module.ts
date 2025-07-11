import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
  imports: [CommonModule, HttpClientModule,MatFormFieldModule,MatInputModule,
   MatButtonModule, MatProgressSpinnerModule,MatCheckboxModule],
})
export class ProfileDetailPageModule {}
