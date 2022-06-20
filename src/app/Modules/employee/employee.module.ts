import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { SharedModule } from '../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
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
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ApplyLeaveComponent } from './EmployeeRequest/apply-leave/apply-leave.component';
import { ApplyloansComponent } from './EmployeeRequest/applyloans/applyloans.component';
import { ApplyOTComponent } from './EmployeeRequest/apply-ot/apply-ot.component';
import { SalaryAdjustmentRequestComponent } from './EmployeeRequest/salary-adjustment-request/salary-adjustment-request.component';
import { AddExpenseComponent } from './EmployeeRequest/add-expense/add-expense.component';
import { EmployeeResignformComponent } from './EmployeeRequest/employee-resignform/employee-resignform.component';


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
    EmploymentcertificateComponent,
    ApplyLeaveComponent,
    ApplyloansComponent,
    ApplyOTComponent,
    SalaryAdjustmentRequestComponent,
    AddExpenseComponent,
    EmployeeResignformComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    SharedModule,
    FormsModule ,

  ]
})
export class EmployeeModule { }
