import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { SharedModule } from '../shared/shared.module';

import { LeavesComponent } from './EmployeeRequest/leaves/leaves.component';
import { LoansComponent } from './EmployeeRequest/loans/loans.component';
import { OTrequestComponent } from './EmployeeRequest/otrequest/otrequest.component';
import { SalaryadjustmentComponent } from './EmployeeRequest/salaryadjustment/salaryadjustment.component';
import { ExpenseComponent } from './EmployeeRequest/expense/expense.component';
import { ResignationComponent } from './EmployeeRequest/resignation/resignation.component';
import { AttendanceComponent } from './Attendance/attendance/attendance.component';
import { PayslipComponent } from './Reports/payslip/payslip.component';
import { ContributioncertificateComponent } from './Reports/contributioncertificate/contributioncertificate.component';
import { CertificateofloanComponent } from './Reports/certificateofloan/certificateofloan.component';
import { EmploymentcertificateComponent } from './Reports/employmentcertificate/employmentcertificate.component';
import { NgxDropzoneModule } from 'ngx-dropzone';


@NgModule({
  declarations: [
    EmployeeComponent,
    OTrequestComponent,
    LeavesComponent,
    LoansComponent,
    OTrequestComponent,
    SalaryadjustmentComponent,
    ExpenseComponent,
    ResignationComponent,
    AttendanceComponent,
    PayslipComponent,
    ContributioncertificateComponent,
    CertificateofloanComponent,
    EmploymentcertificateComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    SharedModule,
    FormsModule ,
    NgxDropzoneModule
  ]
})
export class EmployeeModule { }
