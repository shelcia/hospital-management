import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { DepartmentViewComponent } from './department-view/department-view.component';
import { HospitalViewComponent } from './hospital-view/hospital-view.component';

const routes: Routes = [
  { path: 'hospital', component: HospitalViewComponent },
  { path: 'department', component: DepartmentViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
