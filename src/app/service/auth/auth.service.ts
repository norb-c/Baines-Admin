import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from 'src/app/modules/auth/login/login.model';
import { Endpoint } from 'src/app/utils/endpoint';
import { Constant } from 'src/app/utils/constant';
import { ForgotPasswordModel } from 'src/app/modules/auth/forgot-password/forgot-password.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Path } from 'src/app/utils/path';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { 
    
  }

  get token() {
    return localStorage.getItem(Constant.ACCESS_TOKEN);
  }

  get user() {
    return localStorage.getItem(Constant.CURRENT_USERS);
  }

  set token(item) {
    localStorage.setItem(Constant.ACCESS_TOKEN, item);
  }

  set user(item) {
    localStorage.setItem(Constant.CURRENT_USERS, item);
  }

  login(credential: LoginModel) {
    return this.http.post(Endpoint.LOGIN, credential);
  }

  forgotPasword(credential: ForgotPasswordModel) {
    return this.http.post(Endpoint.FORGOT_PASSWORD, credential);
  }

  logout() {
    return this.http.post('delete', `${Endpoint.LOGIN}/logout`)
      .pipe(
       map((res: any)=> {
          if(res.status === Constant.SUCCESS){
            localStorage.clear();
            this.router.navigate([Path.LOGIN])
            return;
          }
         }
       )
      );
  }
}