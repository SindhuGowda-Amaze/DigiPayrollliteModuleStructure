import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HrRoutingModule } from './hr-routing.module';
import { HrComponent } from './hr.component';
import { SharedModule } from '../shared/shared.module';
import { EmployeeDashboardComponent } from './employees/employee-dashboard/employee-dashboard.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SalaryDetailsDashComponent } from './employees/salary-details-dash/salary-details-dash.component';
import { EmploymentJobHistoryComponent } from './employees/employment-job-history/employment-job-history.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    HrComponent,
    EmployeeDashboardComponent,
    SalaryDetailsDashComponent,
    EmploymentJobHistoryComponent
  ],
  imports: [
    CommonModule,
    HrRoutingModule,
    SharedModule,
    FormsModule,
    NgxPaginationModule,
 
   
  ]
})
export class HrModule { }
