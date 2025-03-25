import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.api;

  constructor(private http: HttpClient) { }

  private userDetails: any;

  getUserDetails(): Observable<any> {
    // If userDetails is already available, return it

    if (this.userDetails) {
      return new Observable(observer => {
        observer.next(this.userDetails);
        observer.complete();
      });
    }

    // Fetch user details from the API
    const url = `${this.apiUrl}/user/`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
      // Add any required headers, such as authorization
    });

    // return this.http.get<any>(url, { headers }).pipe(
    //   tap(userDetails => {
    //     // Cache the fetched user details locally
    //     this.userDetails = userDetails;
    //   })
    // );

    return this.http.get<any>(url, { headers })

  }




  dashboard(startDate?: string, endDate?: string): Observable<any> {
    // If userDetails is already available, return it
    if (this.userDetails) {
      return new Observable(observer => {
        observer.next(this.userDetails);
        observer.complete();
      });
    }

    // Fetch user details from the API
    const url = `${this.apiUrl}/dashboard/`;
    let params = new HttpParams();
    if (startDate) {
      params = params.set('start_date', startDate);
    }
    if (endDate) {
      params = params.set('end_date', endDate);
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
      // Add any required headers, such as authorization
    });

    return this.http.get<any>(url, { params, headers });
  }


  getSector(): Observable<any> {
    // If userDetails is already available, return it
    if (this.userDetails) {
      return new Observable(observer => {
        observer.next(this.userDetails);
        observer.complete();
      });
    }

    // Fetch user details from the API
    const url = `${this.apiUrl}/sectors/`;
    let params = new HttpParams();
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
      // Add any required headers, such as authorization
    });

    return this.http.get<any>(url, { params, headers });
  }


  getAdminUser(filterOptions?: any): Observable<any> {
    let headers = new HttpHeaders({
      'Accept': '*/*',
    });

    let params = new HttpParams();
    if (filterOptions) {
      // Add filter options to params
      for (const key in filterOptions) {
        if (Object.prototype.hasOwnProperty.call(filterOptions, key)) {
          params = params.append(key, filterOptions[key]);
        }
      }
    }

    return this.http.get<any>(`${this.apiUrl}/user/users/`, { headers, params });
  }

  updateWallet(params:any): Observable<any> {
    console.log("updateting")
    return this.http.post(`${this.apiUrl}/user/update-wallet/`, params);
  }


  getBalance(): Observable<any> {
    // If userDetails is already available, return it
    
    // Fetch user details from the API
    const url = `${this.apiUrl}/user/balance/`;
    let params = new HttpParams();
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
      // Add any required headers, such as authorization
    });

    return this.http.get<any>(url, { params, headers });
  }



  goLive(): Observable<any> {
    // If userDetails is already available, return it
    
    // Fetch user details from the API
    const url = `${this.apiUrl}/go-live/`;
    let params = new HttpParams();
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
      // Add any required headers, such as authorization
    });

    return this.http.get<any>(url, { params, headers });
  }


  forgetPassword(params:any): Observable<any> {
    console.log("forgot password is calling")
    return this.http.post(`${this.apiUrl}/user/forgot-password/`, params);
  }



}
