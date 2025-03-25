import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = environment.api;
  constructor(private http: HttpClient) { }

  getAPIs(filterOptions?: any): Observable<any> {
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

    return this.http.get<any>(`${this.apiUrl}/apis/`, { headers, params });
  }

  subscribeToAPI(apiId: number): Observable<any> {
    let headers = new HttpHeaders({
      'Accept': '*/*',
    });

    let body = {
      api_id: apiId
    };

    return this.http.post<any>(`${this.apiUrl}/apis/subscribe/`, body, { headers });
  }


  getAPIUsage(filterOptions?: any): Observable<any> {
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

    return this.http.get<any>(`${this.apiUrl}/apis/usage/`, { headers, params });
  }



  getAPIPricing(filterOptions?: any): Observable<any> {
        let headers = new HttpHeaders();

    let params = new HttpParams();
    if (filterOptions) {
      // Add filter options to params
      for (const key in filterOptions) {
        if (Object.prototype.hasOwnProperty.call(filterOptions, key)) {
          params = params.append(key, filterOptions[key]);
        }
      }
    }

    return this.http.get<any>(`${this.apiUrl}/apis/pricing/`, { headers, params });
  }



  getAPIDetail(apiId: any): Observable<any> {
    let headers = new HttpHeaders({
      'Accept': '*/*',
    });

    let params = new HttpParams();
    params = params.append("api_id", apiId);
      

    return this.http.get<any>(`${this.apiUrl}/apis/details/`, { headers, params });
  }


  getAPIHistory(filterOptions?: any): Observable<any> {
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

    return this.http.get<any>(`${this.apiUrl}/apis/history/`, { headers, params });
  }



}
