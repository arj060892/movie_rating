import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '../../../node_modules/@angular/forms';
import { Utility } from '../helpers/utility';
import { UserService } from '../helpers/services/user.service';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  isUserInValid = false;
  constructor(private fb: FormBuilder,
    private route: Router,
    private userService: UserService) {
    this.loginForm = fb.group({
      email: new FormControl('', Validators.email),
      password: new FormControl('', Validators.required)
    });
  }
  get emailControl(): FormControl {
    return this.loginForm.controls['email'] as FormControl;
  }
  get passwordControl(): FormControl {
    return this.loginForm.controls['password'] as FormControl;
  }
  onLogin() {
    Utility.onValidateForm(this.loginForm);
    if (this.loginForm.valid) {
      if ((this.userService.isUservalid(this.emailControl.value, this.passwordControl.value))) {
        this.isUserInValid = false;
        this.route.navigate(['/dashboard']);
      } else {
        this.isUserInValid = true;
      }

    }

  }

}
