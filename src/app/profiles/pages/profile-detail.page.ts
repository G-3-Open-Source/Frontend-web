import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { catchError, switchMap, finalize, of } from 'rxjs';

import { UserService } from '../services/user.services';
import { UserProfileService } from '../services/profiles.service';
import { ActivityLevelsServices } from '../services/activityLevels.services';
import { AllergysServices } from '../services/allergys.services';
import { ObjetivesServices } from '../services/objetives.services';
import { ActivityLevel } from '../model/activityLevel.entity';
import { Allergy } from '../model/allergy.entity';
import { Objective } from '../model/objetive.entity';
import { Profile } from '../model/profile.entity';
import { User } from '../model/user.entity';

@Component({
  selector: 'app-profile-detail',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSnackBarModule
  ],
  templateUrl: './profile-detail.page.html',
  styleUrls: ['./profile-detail.page.css']
})
export class ProfileDetailPage implements OnInit {
  profileForm!: FormGroup;
  editMode = true;
  loading = false;
  user?: User;
  userProfile?: Profile;
  activityLevels: ActivityLevel[] = [];
  objectives: Objective[] = [];
  allergies: Allergy[] = [];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private activityLevelsService: ActivityLevelsServices,
    private objectivesService: ObjetivesServices,
    private allergiesService: AllergysServices,
    private profilesService: UserProfileService,
    private usersService: UserService
  ) {}

  ngOnInit() {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      isActive: [true],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
      height: [0, [Validators.required, Validators.min(0)]],
      weight: [0, [Validators.required, Validators.min(0)]],
      userScore: [0, [Validators.required, Validators.min(0)]],
      activityLevelId: [null],
      objectiveId: [null],
      allergyIds: [[]]
    });
    this.loadOptions();
  }

  private loadOptions() {
    this.activityLevelsService.getAllArray().subscribe(data => this.activityLevels = data);
    this.objectivesService.getAllArray().subscribe(data => this.objectives = data);
    this.allergiesService.getAllArray().subscribe(data => this.allergies = data);
  }

  save() {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    const f = this.profileForm.value;
    this.loading = true;

    // Armar payload del UserProfile
    const profilePayload: Partial<Profile> = {
      gender: f.gender,
      height: f.height,
      weight: f.weight,
      userScore: f.userScore,
      activityLevelId: f.activityLevelId,
      objectiveId: f.objectiveId,
      allergyNames: this.allergies.filter(a => f.allergyIds.includes(a.id)).map(a => a.name)
    };

    this.profilesService.createJson(profilePayload as Profile).pipe(
      catchError(err => {
        this.snackBar.open('Error al crear perfil: ' + err.message, 'Cerrar', { duration: 3000 });
        return of(null);
      }),
      switchMap(newProfile => {
        if (!newProfile) return of(null); // si falló el perfil, no seguimos
        this.userProfile = newProfile;

        // Armar payload del User usando el userProfile recién creado
        const userPayload: Partial<User> = {
          name: f.name,
          email: f.email,
          password: f.password,
          isActive: f.isActive,
          birthDate: f.birthDate,
          userProfileId: newProfile.id
        };

        // Creamos directamente el User sin buscar previamente
        return this.usersService.createJson(userPayload as User);
      }),
      catchError(err => {
        this.snackBar.open('Error al crear usuario: ' + err.message, 'Cerrar', { duration: 3000 });
        return of(null);
      }),
      finalize(() => this.loading = false)
    ).subscribe(resultUser => {
      if (resultUser) {
        // Guarda solo el ID como string
        localStorage.setItem('userId', resultUser.toString());

        this.snackBar.open('Cuenta creada con éxito', 'Cerrar', { duration: 3000 });
        this.editMode = false;
        this.profileForm.disable();
      }
    });
  }


  edit() {
    this.editMode = true;
    this.profileForm.enable();
  }
}
