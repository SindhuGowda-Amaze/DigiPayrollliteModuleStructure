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
import { SSSR3ReportComponent } from './Reports/SSS/sssr3-report/sssr3-report.component';
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
import { BIR2316ReportComponent } from './Reports/BIR/bir2316-report/bir2316-report.component';
import { ProfileCompletionFormComponent } from './employees/profile-completion-form/profile-completion-form.component';
import { NgWizardConfig, NgWizardModule, THEME } from 'ng-wizard';
import { HolidayDashboardComponent } from './holiday-dashboard/holiday-dashboard.component';
import { VaccineDashboardComponent } from './vaccine-dashboard/vaccine-dashboard.component';
import { VaccineFormComponent } from './vaccine-form/vaccine-form.component';
import { StaffSalaryFormComponent } from './employees/staff-salary-form/staff-salary-form.component';
import { EmpJobHistoryFormComponent } from './employees/emp-job-history-form/emp-job-history-form.component';
import { LeaveFormComponent } from './Requests/leave-form/leave-form.component';
import { LoanFormComponent } from './Requests/loan-form/loan-form.component';
import { PayRollRunsFormComponent } from './pay-roll-runs-form/pay-roll-runs-form.component';
import { ExpenseReportComponent } from './Reports/Payroll/expense-report/expense-report.component';
import { ModifiedAttendanceReportComponent } from './Reports/Payroll/modified-attendance-report/modified-attendance-report.component';
import { OverTimeSummaryPerEmployeeComponent } from './Reports/Payroll/over-time-summary-per-employee/over-time-summary-per-employee.component';
import { OvertimeSummaryReportComponent } from './Reports/Payroll/overtime-summary-report/overtime-summary-report.component';
import { GeneralLedgerReportComponent } from './Reports/Payroll/general-ledger-report/general-ledger-report.component';
import { SSSBreakdownComponent } from './Reports/SSS/sssbreakdown/sssbreakdown.component';
import { BIRAlphaList7Component } from './Reports/BIR/biralpha-list7/biralpha-list7.component';
import { BIR1603ReportComponent } from './Reports/BIR/bir1603-report/bir1603-report.component';
import { BIR1604FReportComponent } from './Reports/BIR/bir1604-freport/bir1604-freport.component';
import { BIR1700ReportComponent } from './Reports/BIR/bir1700-report/bir1700-report.component';
import { PayrollCutOffDatesComponent } from './Configuration/payroll-cut-off-dates/payroll-cut-off-dates.component';
import { CutOffConfigurationFormComponent } from './Configuration/cut-off-configuration-form/cut-off-configuration-form.component';
import { RemittanceConfigDashComponent } from './Configuration/remittance-config-dash/remittance-config-dash.component';
import { RemittanceConfigFormComponent } from './Configuration/remittance-config-form/remittance-config-form.component';
import { LookAndFeelFormComponent } from './Configuration/look-and-feel-form/look-and-feel-form.component';
import { LeaveConfigFormComponent } from './Configuration/leave-config-form/leave-config-form.component';
import { AttendanceConfigFormComponent } from './Configuration/attendance-config-form/attendance-config-form.component';
import { LeaveTypeDashboardComponent } from './Masters/leave-type-dashboard/leave-type-dashboard.component';
import { LeaveTypeFormComponent } from './Masters/leave-type-form/leave-type-form.component';
import { ShiftMasterDashComponent } from './Masters/shift-master-dash/shift-master-dash.component';
import { ShiftMasterFormComponent } from './Masters/shift-master-form/shift-master-form.component';
import { SeparationTypeDashComponent } from './Masters/separation-type-dash/separation-type-dash.component';
import { SeparationTypeFormComponent } from './Masters/separation-type-form/separation-type-form.component';

const ngWizardConfig: NgWizardConfig = {
  theme: THEME.circles
};
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
    BIR1604CFReportComponent,
    BIR2316ReportComponent,
    ProfileCompletionFormComponent,
    HolidayDashboardComponent,
    VaccineDashboardComponent,
    VaccineFormComponent,
    StaffSalaryFormComponent,
    EmpJobHistoryFormComponent,
    LeaveFormComponent,
    LoanFormComponent,
    PayRollRunsFormComponent,
    ExpenseReportComponent,
    ModifiedAttendanceReportComponent,
    OverTimeSummaryPerEmployeeComponent,
    OvertimeSummaryReportComponent,
    GeneralLedgerReportComponent,
    SSSBreakdownComponent,
    SSSR3ReportComponent,
    BIRAlphaList7Component,
    BIR1603ReportComponent,
    BIR1604FReportComponent,
    BIR1700ReportComponent,
    PayrollCutOffDatesComponent,
    CutOffConfigurationFormComponent,
    RemittanceConfigDashComponent,
    RemittanceConfigFormComponent,
    LookAndFeelFormComponent,
    LeaveConfigFormComponent,
    AttendanceConfigFormComponent,
    LeaveTypeDashboardComponent,
    LeaveTypeFormComponent,
    ShiftMasterDashComponent,
    ShiftMasterFormComponent,
    SeparationTypeDashComponent,
    SeparationTypeFormComponent
  ],
  imports: [
    CommonModule,
    HrRoutingModule,
    SharedModule,
    FormsModule,
    NgxPaginationModule,
   // NgMultiSelectDropDownModule.forRoot(),
  //  Ng2SearchPipeModule,

  ]
})
export class HrModule { }
