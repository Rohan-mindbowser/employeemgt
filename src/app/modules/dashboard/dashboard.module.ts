import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { EmployelistComponent } from './employelist/employelist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditemployeeComponent } from './editemployee/editemployee.component';


@NgModule({
  declarations: [
    EmployelistComponent,
    EditemployeeComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
