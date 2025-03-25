// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.api;
  private userKey = 'currentUser';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const loginData = { username, password };
    return this.http.post(`${this.apiUrl}/user/login/`, loginData);
  }

  storeUserData(userData: any): void {
    localStorage.setItem(this.userKey, JSON.stringify(userData));
  }

  getUserData(): any {
    
    const userDataString = localStorage.getItem(this.userKey);
    return userDataString ? JSON.parse(userDataString) : null;
  }

  isUserAdmin(): any {
    
    const userDataString = localStorage.getItem(this.userKey);
    return userDataString ? JSON.parse(userDataString)['is_admin'] : null;
  }


  clearUserData(): void {
    localStorage.removeItem(this.userKey);
  }

signUp(email: string, fullname:string, password: string, contact:string): Observable<any> {
    // const loginData = { username, password };
    let body = {
      username: fullname,
      email:email,
      password:password,
      contact:contact
    };
    console.log("sign up service is calling", body)
    return this.http.post<any>(`${this.apiUrl}/user/sign-up/`, body).pipe(
      catchError(error => {
        console.error('Error occurred during sign-up:', error);
        return throwError(error); // Rethrow the error to propagate it to the caller
      })
    );
  }



  // You can add a signUp method here similarly
}
