import {Component, OnInit} from '@angular/core';
import {BaseFormComponent} from "../../../shared/components/base-form.component";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {SignUpRequest} from "../../model/sign-up.request";
import {NgIf} from "@angular/common";
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent extends BaseFormComponent implements OnInit {

  form!: FormGroup;
  submitted = false;

  constructor(private builder: FormBuilder, private authenticationService: AuthenticationService, private router: Router) {
    super();
  }
  redirectToSignIn() {
    this.router.navigate(['/sign-in']);
  }
  ngOnInit(): void {
    this.form = this.builder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  override isInvalidControl(form: FormGroup, controlName: string): boolean {
    const control = form.get(controlName);
    return !!control && control.invalid && this.submitted;
  }

  override errorMessagesForControl(form: FormGroup, controlName: string): string {
    return 'This field is required';
  }

  onSubmit() {
    if (this.form.invalid) return;
    const username = this.form.value.username;
    const password = this.form.value.password;
    const signUpRequest = new SignUpRequest(username, password);
    this.authenticationService.signUp(signUpRequest);
    this.submitted = true;
  }
}
