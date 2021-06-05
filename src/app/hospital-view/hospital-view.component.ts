import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { HospitalsService } from '../hospitals.service';
import { Hospital } from '../hospital';

@Component({
  selector: 'app-hospital-view',
  templateUrl: './hospital-view.component.html',
  styleUrls: ['./hospital-view.component.scss'],
})
export class HospitalViewComponent implements OnInit {
  // data: Hospital[] = [];

  data = {};
  constructor(private HospitalService: HospitalsService) {}

  ngOnInit() {
    this.data = this.HospitalService.getHospitals();
    console.log(this.data);
    console.log('Hospital mei');
  }
}
