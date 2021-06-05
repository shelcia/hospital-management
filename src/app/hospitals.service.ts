import { Injectable } from '@angular/core';
import { Hospital } from './hospital';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
// import { stringify } from '@angular/compiler/src/util';
import { catchError, tap, map } from 'rxjs/operators';
// import { API_URL } from "./api.js";

@Injectable({
  providedIn: 'root',
})
export class HospitalsService {
  private apiURL = `http://localhost:4050/api/hospitals`;

  constructor(private http: HttpClient) {}

  getHospitals(): Observable<Hospital[]> {
    return this.http.get<Hospital[]>(this.apiURL).pipe(
      tap((data) => {
        console.log('All: ' + JSON.stringify(data));
        console.log('Service mei');
      }),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
