import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '../../../node_modules/@angular/forms';
import { Utility } from '../helpers/utility';
import { IUser } from '../helpers/models/user.model';
import { Router } from '../../../node_modules/@angular/router';
import { UserService } from '../helpers/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registrationForm: FormGroup;
  isFormError = false;
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private userService: UserService) {
    this.registrationForm = fb.group({
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
      password: new FormControl('', Validators.required)
    });
  }

  get fullNameControl(): FormControl {
    return this.registrationForm.controls['fullName'] as FormControl;
  }
  get emailControl(): FormControl {
    return this.registrationForm.controls['email'] as FormControl;
  }
  get passwordControl(): FormControl {
    return this.registrationForm.controls['password'] as FormControl;
  }
  onRegister() {
    Utility.onValidateForm(this.registrationForm);
    if (this.registrationForm.valid) {

      const userDtls: IUser = {
        fullName: this.fullNameControl.value,
        emailId: this.emailControl.value,
        password: this.passwordControl.value
      };

      this.userService.registerUser(userDtls);
      alert('sucess');
      this.route.navigate(['/dashboard']);
    } else {
      this.isFormError = true;
    }
  }
}
