import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebflowService {
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

    return this.http.get<any>(`${this.apiUrl}/webflow/api/`, { headers, params });
  }


  getWorkflow(filterOptions?: any): Observable<any> {
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

    return this.http.get<any>(`${this.apiUrl}/webflow/workflow/`, { headers, params });
  }



  createWorkflow(payload: any): Observable<any> {
    let headers = new HttpHeaders({
      'Accept': '*/*',
      'Content-Type': 'application/json' // Set content type to JSON
    });

    return this.http.post<any>(`${this.apiUrl}/webflow/workflow/`, payload, { headers });
  }


  getWFDetail(wfId: any): Observable<any> {
    let headers = new HttpHeaders({
      'Accept': '*/*',
    });

    let params = new HttpParams();
    params = params.append("wf_id", wfId);
      

    return this.http.get<any>(`${this.apiUrl}/webflow/details/`, { headers, params });
  }


  subscribeToWF(wfId: number): Observable<any> {
    let headers = new HttpHeaders({
      'Accept': '*/*',
    });

    let body = {
      wf_id: wfId
    };

    return this.http.post<any>(`${this.apiUrl}/webflow/subscribe/`, body, { headers });
  }

  getWFHistory(filterOptions?: any): Observable<any> {
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

    return this.http.get<any>(`${this.apiUrl}/webflow/history/`, { headers, params });
  }




}
