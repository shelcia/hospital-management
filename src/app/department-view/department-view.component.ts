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

  constructor(
    private route: ActivatedRoute,
    private HospitalService: HospitalsService
  ) {}

  clearFields() {
    this.dept = '';
    this.head = '';
    this.contact = '';
  }

  buttonSubmit() {
    if (this.dept === '' || this.contact === '' || this.head === '') {
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
      console.log(alphaRegex.test(this.dept) === false);
      if (!alphaRegex.test(this.dept) === false) {
        this.alert = true;
        this.ifSuccess = false;
        this.content = 'Enter only alphabets in Department Field';
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

  ngOnInit() {
    let id = this.route.snapshot.params.id;
    this.hospital = id;
    let observable = this.HospitalService.getDepartments(id);
    observable.subscribe((data) => console.log(data));
    observable.subscribe((data) => (this.data = data));
  }
}
