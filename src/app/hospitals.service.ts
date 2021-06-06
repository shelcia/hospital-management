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
  private apiURL = `https://hosp-mgmt.herokuapp.com/api/hospital`;

  constructor(private http: HttpClient) {}

  public getHospitals() {
    return this.http.get(this.apiURL);
  }

  public addHospitals(name: String, number: String) {
    const body = {
      hospitalname: name,
      contactnumber: number,
    };
    console.log(
      this.http.post(this.apiURL, body).subscribe((data) => console.log(data))
    );
  }

  public editHospitals(name: String, number: String) {
    const body = {
      hospitalname: name,
      contactnumber: number,
    };
    console.log(
      this.http
        .put(`${this.apiURL}/${name}`, body)
        .subscribe((data) => console.log(data))
    );
  }

  public delHospitals(name: String) {
    let modifiedLink = this.apiURL + '/' + name;
    console.log(modifiedLink);
    console.log(
      this.http.delete(modifiedLink).subscribe((data) => console.log(data))
    );
  }
}
