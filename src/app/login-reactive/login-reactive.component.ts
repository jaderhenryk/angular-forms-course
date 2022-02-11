import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { createPasswordStrengthValidator } from '../validators/password-strength.validator';


@Component({
  selector: 'login',
  templateUrl: './login-reactive.component.html',
  styleUrls: ['./login-reactive.component.css']
})
export class LoginReactiveComponent implements OnInit {

  // this is a way to create controls using FormControl & FormGroup directives
  // loginForm = new FormGroup({
  //   email: new FormControl('', {
  //     validators: [
  //       Validators.required,
  //       Validators.email
  //     ],
  //     updateOn: 'blur'
  //   }),
  //   password: new FormControl('', {
  //     validators: [
  //       Validators.required,
  //       Validators.minLength(6),
  //       createPasswordStrengthValidator()
  //     ]
  //   })
  // });

  // this is the way to create controls using FormBuilder API
  loginForm = this.formBuilder.group({
    email: ['', {
      validators: [
        Validators.required,
        Validators.email
      ],
      updateOn: 'blur'
    }],
    password: ['', [Validators.required, Validators.minLength(6), createPasswordStrengthValidator()]]
  });

  constructor(private formBuilder: FormBuilder) {


  }

  ngOnInit() {

  }

  login(loginForm: FormGroup, submit) {
    console.log(loginForm.value, loginForm.valid, submit);
  }


  get email() {
    return this.loginForm.controls['email'];
  }

  get password() {
    return this.loginForm.controls['password']
  }
}
