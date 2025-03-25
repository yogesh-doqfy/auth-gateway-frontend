import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  private apiUrl = environment.api;
  constructor(private http: HttpClient) { }

  createTransaction(payload: any): Observable<any> {
    let headers = new HttpHeaders({
      'Accept': '*/*',
      'Content-Type': 'application/json' // Set content type to JSON
    });

    return this.http.post<any>(`${this.apiUrl}/wallet/transaction/`, payload, { headers });
  }



  getTransactionHistory(filterOptions?: any): Observable<any> {
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

    return this.http.get<any>(`${this.apiUrl}/wallet/transaction-history/`, { headers, params });
  }



}
