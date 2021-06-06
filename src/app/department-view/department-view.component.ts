import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HospitalsService } from '../hospitals.service';

@Component({
  selector: 'app-department-view',
  templateUrl: './department-view.component.html',
  styleUrls: ['./department-view.component.scss'],
})
export class DepartmentViewComponent implements OnInit {
  data: any = [];
  hospital = '';
  contact = '';
  dept = '';
  head = '';

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
    dept: '',
    head: '',
    hospital: '',
    contact: '',
    original: '',
  };

  initialiseUpdatedRecord(name: String) {
    const content = this.data.filter(
      (item: any) => item.departmentname === name
    );
    console.log(content);
    this.updatedRecord.original = content[0].departmentname;

    this.updatedRecord.dept = content[0].departmentname;
    this.updatedRecord.contact = content[0].contactnumber;
    this.updatedRecord.head = content[0].head;
    this.updatedRecord.hospital = content[0].hospitalname;

    this.handleOpen();
  }

  constructor(
    private route: ActivatedRoute,
    private HospitalService: HospitalsService
  ) {}

  // METHOD TO CLEAR FIELDS
  clearFields() {
    this.dept = '';
    this.head = '';
    this.contact = '';
  }

  // METHOD TO ADD RECORD
  buttonSubmit() {
    if (this.dept === '' || this.contact === '' || this.head === '') {
      this.alert = true;
      this.ifSuccess = false;
      this.content = 'No empty fields allowed';
      return;
    }

    let regex = /^[0-9]{10}$/g;
    let alphaRegex = /^[a-zA-Z ]*$/g;
    let headRegex = /^[a-zA-Z ]*$/;

    if (regex.test(this.contact) === false) {
      this.alert = true;
      this.ifSuccess = false;
      this.content = 'Enter valid 10 digit number';
    } else {
      console.log('head', this.head);
      console.log(alphaRegex.test(this.dept));
      console.log(headRegex.test(this.head));

      if (!alphaRegex.test(this.dept) && !headRegex.test(this.head)) {
        this.alert = true;
        this.ifSuccess = false;
        this.content = 'Enter only alphabets in Department and HOD Field';
      } else {
        this.alert = false;
        this.HospitalService.addDepartment(
          this.dept,
          this.hospital,
          this.head,
          this.contact
        );
        this.clearFields();
        this.isAdding = true;
        setTimeout(() => {
          let observable = this.HospitalService.getDepartments(
            this.route.snapshot.params.id
          );
          observable.subscribe((data) => (this.data = data));
          this.isAdding = false;
        }, 3000);
      }
    }
  }

  // METHOD TO DELETE RECORD
  onDelete(name: String) {
    this.HospitalService.delDepartment(name);
    this.isDanger = true;
    setTimeout(() => {
      let observable = this.HospitalService.getDepartments(
        this.route.snapshot.params.id
      );
      observable.subscribe((data) => (this.data = data));
      this.isDanger = false;
    }, 3000);
  }

  // METHOD TO SORT RECORDS by DEPT NAME
  compare(a: any, b: any) {
    if (a.departmentname < b.departmentname) {
      return -1;
    }
    if (a.departmentname > b.departmentname) {
      return 1;
    }
    return 0;
  }

  onSort() {
    this.data.sort(this.compare);
    console.log(this.data);
  }

  onEdit() {
    this.HospitalService.editDepartment(
      this.updatedRecord.original,
      this.updatedRecord
    );
    setTimeout(() => {
      let observable = this.HospitalService.getDepartments(
        this.route.snapshot.params.id
      );
      observable.subscribe((data) => (this.data = data));
      this.handleClose();
    }, 3000);
  }

  ngOnInit() {
    let id = this.route.snapshot.params.id;
    this.hospital = id;
    let observable = this.HospitalService.getDepartments(id);
    observable.subscribe((data) => console.log(data));
    observable.subscribe((data) => (this.data = data));
  }
}
