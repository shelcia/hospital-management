import { Component, OnInit } from '@angular/core';
import { HospitalsService } from '../hospitals.service';

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

  modal = false;

  handleOpen() {
    this.modal = true;
  }

  handleClose() {
    this.modal = false;
  }

  updatedRecord = {
    orginial: '',
    hospital: '',
    contact: '',
  };

  initialiseUpdatedRecord(name: String) {
    const content = this.data.filter((item: any) => item.hospitalname === name);
    console.log(content);
    this.updatedRecord.contact = content[0].contactnumber;
    this.updatedRecord.hospital = content[0].hospitalname;
    this.updatedRecord.orginial = content[0].hospitalname;

    this.handleOpen();
  }

  data: any = [];
  constructor(private HospitalService: HospitalsService) {}

  clearFields() {
    this.hospital = '';
    this.contact = '';
  }

  // METHOD TO ADD RECORD
  buttonSubmit() {
    //EMPTY FIELD VALIDATION
    if (this.hospital === '' || this.contact === '') {
      this.alert = true;
      this.ifSuccess = false;
      this.content = 'No empty fields allowed';
      return;
    }
    //REGEX VALIDATION
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
        //ADDING THE RECORD
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

  // METHOD TO DELETE RECORD
  onDelete(name: String) {
    this.isDanger = true;
    this.HospitalService.delHospitals(name);
    setTimeout(() => {
      let observable = this.HospitalService.getHospitals();
      observable.subscribe((data) => (this.data = data));
      this.isDanger = false;
    }, 3000);
  }
  //METHOD TO SORT RECORDS BASED ON HOSPITAL NAME
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

  onEdit() {
    this.HospitalService.editHospitals(
      this.updatedRecord.orginial,
      this.updatedRecord
    );
    setTimeout(() => {
      let observable = this.HospitalService.getHospitals();
      observable.subscribe((data) => (this.data = data));
      this.handleClose();
    }, 3000);
  }

  ngOnInit() {
    let observable = this.HospitalService.getHospitals();
    observable.subscribe((data) => console.log(data));
    observable.subscribe((data) => (this.data = data));
  }
}
