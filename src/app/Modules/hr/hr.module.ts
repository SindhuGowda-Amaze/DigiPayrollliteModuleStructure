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
import { ER2Component } from './Reports/Philhealth/er2/er2.component';
import { RFReportComponent } from './Reports/Philhealth/rfreport/rfreport.component';
import { RF1PDFReportComponent } from './Reports/Philhealth/rf1-pdfreport/rf1-pdfreport.component';
import { M1MCRFReportComponent } from './Reports/Pag-IBig/m1-mcrfreport/m1-mcrfreport.component';
import { M1ExcelReportComponent } from './Reports/Pag-IBig/m1-excel-report/m1-excel-report.component';
import { STLRFReportComponent } from './Reports/Pag-IBig/stlrfreport/stlrfreport.component';
import { STLRFExcelReportComponent } from './Reports/Pag-IBig/stlrfexcel-report/stlrfexcel-report.component';
import { BIR1601CReportComponent } from './Reports/BIR/bir1601-creport/bir1601-creport.component';
import { BIR1604CReportComponent } from './Reports/BIR/bir1604-creport/bir1604-creport.component';
import { BIR1604CFReportComponent } from './Reports/BIR/bir1604-cfreport/bir1604-cfreport.component';
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
    SSSRL1ReportComponent,
    ER2Component,
    RFReportComponent,
    RF1PDFReportComponent,
    M1MCRFReportComponent,
    M1ExcelReportComponent,
    STLRFReportComponent,
    STLRFExcelReportComponent,
    BIR1601CReportComponent,
    BIR1604CReportComponent,
    BIR1604CFReportComponent
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
