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
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HRDashboardComponent } from './hrdashboard/hrdashboard.component';
import { GaugeModule } from 'angular-gauge';
import { ExitformalityDashComponent } from './employees/exitformality-dash/exitformality-dash.component';
import { HRLeaveRequestComponent } from './Requests/hrleave-request/hrleave-request.component';
import { TeamLoansComponent } from './Requests/team-loans/team-loans.component';
import { PreliminaryReportComponent } from './preliminary-report/preliminary-report.component';
import { PayRollRunsComponent } from './pay-roll-runs/pay-roll-runs.component';
import { PayRollDashComponent } from './pay-roll-dash/pay-roll-dash.component';
import { BankAdviceListComponent } from './bank-advice-list/bank-advice-list.component';
import { GovernmentComponent } from './government/government.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { LookAndFeelDashComponent } from './Configuration/look-and-feel-dash/look-and-feel-dash.component';
import { LeaveConfigDashComponent } from './Configuration/leave-config-dash/leave-config-dash.component';
import { AttendanceConfigDashComponent } from './Configuration/attendance-config-dash/attendance-config-dash.component';
import { MonthlyReportComponent } from './Reports/Payroll/monthly-report/monthly-report.component';
import { PayrollSummaryReportComponent } from './Reports/Payroll/payroll-summary-report/payroll-summary-report.component';
import { MonthlyAmmortizationReportComponent } from './Reports/Payroll/monthly-ammortization-report/monthly-ammortization-report.component';
import { YTDReportComponent } from './Reports/Payroll/ytdreport/ytdreport.component';
import { YTDReportAdjustmentComponent } from './Reports/Payroll/ytdreport-adjustment/ytdreport-adjustment.component';
import { PayslipReportComponent } from './Reports/Payroll/payslip-report/payslip-report.component';
import { SSSR5ReportComponent } from './Reports/SSS/sssr5-report/sssr5-report.component';
import { SSSML1ReportComponent } from './Reports/SSS/sssml1-report/sssml1-report.component';
import { SSSRL1ReportComponent } from './Reports/SSS/sssrl1-report/sssrl1-report.component';
@NgModule({
  declarations: [
    HrComponent,
    EmployeeDashboardComponent,
    SalaryDetailsDashComponent,
    EmploymentJobHistoryComponent,
    HRDashboardComponent,
    ExitformalityDashComponent,
    HRLeaveRequestComponent,
    TeamLoansComponent,
    PreliminaryReportComponent,
    PayRollRunsComponent,
    PayRollDashComponent,
    BankAdviceListComponent,
    GovernmentComponent,
    LookAndFeelDashComponent,
    LeaveConfigDashComponent,
    AttendanceConfigDashComponent,
    MonthlyReportComponent,
    PayrollSummaryReportComponent,
    MonthlyAmmortizationReportComponent,
    YTDReportComponent,
    YTDReportAdjustmentComponent,
    PayslipReportComponent,
    SSSR5ReportComponent,
    SSSML1ReportComponent,
    SSSRL1ReportComponent
  ],
  imports: [
    CommonModule,
    HrRoutingModule,
    SharedModule,
    FormsModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule.forRoot(),
    Ng2SearchPipeModule,
    GaugeModule.forRoot(),
    NgxDropzoneModule
  ]
})
export class HrModule { }
