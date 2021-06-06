import { Component, OnInit } from '@angular/core';
import { HospitalsService } from '../hospitals.service';
import { Hospital } from '../hospital';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-hospital-view',
  templateUrl: './hospital-view.component.html',
  styleUrls: ['./hospital-view.component.scss'],
})
export class HospitalViewComponent implements OnInit {
  hospital = '';
  contact = '';

  alert = false;
  content = '';
  ifSuccess = false;

  data: any = [];
  constructor(private HospitalService: HospitalsService) {}

  clearFields() {
    this.hospital = '';
    this.contact = '';
  }

  buttonSubmit() {
    if (this.hospital === '' || this.contact === '') {
      this.alert = true;
      this.ifSuccess = false;
      this.content = 'No empty fields allowed';
      return;
    }

    let regex = /^[0-9]{10}$/g;
    let alphaRegex = /[^A-Za-z]+/g;
    // console.log('Regex', regex.test(this.contact));
    // console.log('Result', regex.test(this.contact) === false);
    if (regex.test(this.contact) === false) {
      this.alert = true;
      this.ifSuccess = false;
      this.content = 'Enter valid 10 digit number';
    } else {
      if (alphaRegex.test(this.hospital) === false) {
        this.alert = true;
        this.ifSuccess = false;
        this.content = 'Enter only alphabets in Hospital Field';
      } else {
        this.alert = true;
        this.ifSuccess = true;
        this.content = 'Successfully Submitted';
        console.log(`${this.hospital} - ${this.contact}`);
        this.alert = false;
        this.HospitalService.addHospitals(this.hospital, this.contact);
        this.clearFields();
        setTimeout(() => window.location.reload(), 4000);
      }
    }
  }

  onDelete(name: String) {
    this.HospitalService.delHospitals(name);
    setTimeout(() => window.location.reload(), 4000);
  }

  ngOnInit() {
    let observable = this.HospitalService.getHospitals();
    observable.subscribe((data) => console.log(data));
    observable.subscribe((data) => (this.data = data));
  }
}
