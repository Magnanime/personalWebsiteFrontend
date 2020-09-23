import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RegisterPayload } from './auth/register-payload';
import { Observable } from 'rxjs';
import { LoginPayload } from './auth/login-payload';
import { JwtResponse } from './auth/jwt-auth-response';
import {map} from 'rxjs/operators';
import {LocalStorageService} from 'ngx-webstorage';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'http://localhost:8080/api/auth/';

  constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService) { }

  errorHandler(error: HttpErrorResponse){
    if (error.status == 409){
      return Observable.throw("Username or email already taken")
    }
    return Observable.throw(error.message || "Server error")
  }

  register (registerPayload: RegisterPayload): Observable<any>{
    return this.httpClient.post(this.url + "signup", registerPayload).catch(this.errorHandler);
  }
  
  login(loginPayload: LoginPayload): Observable<boolean> {
    return this.httpClient.post<JwtResponse>(this.url + "login", loginPayload).pipe(map(data =>{
      this.localStorageService.store('authenticationToken', data.authenticationToken);
      this.localStorageService.store('username', data.username);
      return true;
    }));
  }

  logout(): void {
    this.localStorageService.clear("authenticationToken");
    this.localStorageService.clear("username");
  }

  isAuthenticated(): boolean {
    return this.localStorageService.retrieve('username') != null;
  }
}
