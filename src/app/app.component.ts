import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, map, take } from 'rxjs/operators';
import { LoginUser } from './models/login-user';
import * as forge from 'node-forge';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crud-app';

  showError = false;
  showSuccess = false;

  name = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);

  userForm: FormGroup;


  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.userForm = fb.group({
      name: this.name,
      password: this.password
    })    
  }  

  publicKey: string = `-----BEGIN PUBLIC KEY-----
  MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC9xWRoyCNuUln/kBO5nS6C5b10
  /Ec3km8ZGv/k4ih/kyChGPsbdClqXjYLagxE/xZj1ylStuyHAhvowKWgul3uh0xX
  BAuYMkp07eWuMFWKF7Ozfc7EdKcOQZBZEb2tiC3rF2oMO0xZ072cEYPKszqx0ccE
  DWO8u9zv7BdTAO0ZwQIDAQAB
  -----END PUBLIC KEY-----`;


  getPlayers() {
    this.http.get<any>("http://localhost:3963/api/bball")
      .pipe(take(1), map(payload => payload)).subscribe();
  }

  onSubmit() {
    const name = this.userForm.get('name').value;
    const password = this.userForm.get('password').value;

    const rsa = forge.pki.publicKeyFromPem(this.publicKey);
    const encryptedPassword = window.btoa(rsa.encrypt(password));

    const userData: LoginUser = { name, password: encryptedPassword };

    this.http.post<any>("http://localhost:3963/api/login", userData)
    .pipe(take(1)).subscribe(res => {
      if (res) {
        this.showSuccess = true;
        this.showError = false;
      } else {
        this.showSuccess = false;
        this.showError = true;
      }
    });
  }



}
