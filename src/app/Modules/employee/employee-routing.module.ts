import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendanceComponent } from './Attendance/attendance/attendance.component';
import { EmployeeComponent } from './employee.component';
import { ExpenseComponent } from './EmployeeRequest/expense/expense.component';
import { LeavesComponent } from './EmployeeRequest/leaves/leaves.component';
import { LoansComponent } from './EmployeeRequest/loans/loans.component';
import { OTrequestComponent } from './EmployeeRequest/otrequest/otrequest.component';
import { ResignationComponent } from './EmployeeRequest/resignation/resignation.component';
import { SalaryadjustmentComponent } from './EmployeeRequest/salaryadjustment/salaryadjustment.component';
import { CertificateofloanComponent } from './Reports/certificateofloan/certificateofloan.component';
import { ContributioncertificateComponent } from './Reports/contributioncertificate/contributioncertificate.component';
import { EmploymentcertificateComponent } from './Reports/employmentcertificate/employmentcertificate.component';
import { PayslipComponent } from './Reports/payslip/payslip.component';

const routes: Routes = [
  
  { path: '', component: EmployeeComponent },
  { path: 'attendence', component: AttendanceComponent },
  { path: 'payslip', component: PayslipComponent },
  { path: 'contributioncertificate', component: ContributioncertificateComponent },
  { path: 'certificateofloan', component: CertificateofloanComponent },
  { path: 'employmentcertificate', component: EmploymentcertificateComponent },

 { path: "leaves", component: LeavesComponent},

 { path: 'loans', component: LoansComponent },

 { path: 'otrequest', component: OTrequestComponent },

 { path: 'salaryadjustment', component: SalaryadjustmentComponent },

 { path: 'expense', component: ExpenseComponent },

 { path: 'resignation', component: ResignationComponent },







];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
