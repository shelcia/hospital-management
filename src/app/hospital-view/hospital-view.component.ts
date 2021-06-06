import { Component, OnInit } from '@angular/core';
import { HospitalsService } from '../hospitals.service';
import { Hospital } from '../hospital';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

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

  isDanger = false;
  isAdding = false;

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
    let alphaRegex = /^[a-zA-Z ]*$/g;
    if (regex.test(this.contact) === false) {
      this.alert = true;
      this.ifSuccess = false;
      this.content = 'Enter valid 10 digit number';
    } else {
      console.log(alphaRegex.test(this.hospital) === false);
      if (!alphaRegex.test(this.hospital) === false) {
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
        this.isAdding = true;
        setTimeout(() => {
          let observable = this.HospitalService.getHospitals();
          observable.subscribe((data) => (this.data = data));
          this.isAdding = false;
        }, 3000);
      }
    }
  }

  onDelete(name: String) {
    this.isDanger = true;
    this.HospitalService.delHospitals(name);
    setTimeout(() => {
      let observable = this.HospitalService.getHospitals();
      observable.subscribe((data) => (this.data = data));
      this.isDanger = false;
    }, 3000);
  }

  compare(a: any, b: any) {
    if (a.hospitalname < b.hospitalname) {
      return -1;
    }
    if (a.hospitalname > b.hospitalname) {
      return 1;
    }
    return 0;
  }

  onSort() {
    this.data.sort(this.compare);
    console.log(this.data);
  }

  ngOnInit() {
    let observable = this.HospitalService.getHospitals();
    observable.subscribe((data) => console.log(data));
    observable.subscribe((data) => (this.data = data));
  }
}
