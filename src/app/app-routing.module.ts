import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
  ActivatedRoute,
  ParamMap,
} from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { DepartmentViewComponent } from './department-view/department-view.component';
import { HospitalViewComponent } from './hospital-view/hospital-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'hospital', pathMatch: 'full' },
  { path: 'hospital', component: HospitalViewComponent },
  { path: 'department/:id', component: DepartmentViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
