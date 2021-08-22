import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]), 
    password: new FormControl('', Validators.required)
  });

  constructor(public auth: AuthService) { }

  ngOnInit(): void { }

  login() {
    this.auth.auth(this.loginForm.value.email, this.loginForm.value.password);
  }
}
