import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankAdviceListComponent } from './bank-advice-list/bank-advice-list.component';
import { AttendanceConfigDashComponent } from './Configuration/attendance-config-dash/attendance-config-dash.component';
import { LeaveConfigDashComponent } from './Configuration/leave-config-dash/leave-config-dash.component';
import { LookAndFeelDashComponent } from './Configuration/look-and-feel-dash/look-and-feel-dash.component';
import { EmployeeDashboardComponent } from './employees/employee-dashboard/employee-dashboard.component';
import { EmploymentJobHistoryComponent } from './employees/employment-job-history/employment-job-history.component';
import { ExitformalityDashComponent } from './employees/exitformality-dash/exitformality-dash.component';
import { SalaryDetailsDashComponent } from './employees/salary-details-dash/salary-details-dash.component';
import { HrComponent } from './hr.component';
import { HRDashboardComponent } from './hrdashboard/hrdashboard.component';
import { PayRollDashComponent } from './pay-roll-dash/pay-roll-dash.component';
import { PayRollRunsComponent } from './pay-roll-runs/pay-roll-runs.component';
import { PreliminaryReportComponent } from './preliminary-report/preliminary-report.component';
import { BIR1601CReportComponent } from './Reports/BIR/bir1601-creport/bir1601-creport.component';
import { BIR1604CFReportComponent } from './Reports/BIR/bir1604-cfreport/bir1604-cfreport.component';
import { BIR1604CReportComponent } from './Reports/BIR/bir1604-creport/bir1604-creport.component';
import { BIR2316ReportComponent } from './Reports/BIR/bir2316-report/bir2316-report.component';
import { M1ExcelReportComponent } from './Reports/Pag-IBig/m1-excel-report/m1-excel-report.component';
import { M1MCRFReportComponent } from './Reports/Pag-IBig/m1-mcrfreport/m1-mcrfreport.component';
import { STLRFExcelReportComponent } from './Reports/Pag-IBig/stlrfexcel-report/stlrfexcel-report.component';
import { STLRFReportComponent } from './Reports/Pag-IBig/stlrfreport/stlrfreport.component';
import { MonthlyAmmortizationReportComponent } from './Reports/Payroll/monthly-ammortization-report/monthly-ammortization-report.component';
import { MonthlyReportComponent } from './Reports/Payroll/monthly-report/monthly-report.component';
import { PayrollSummaryReportComponent } from './Reports/Payroll/payroll-summary-report/payroll-summary-report.component';
import { PayslipReportComponent } from './Reports/Payroll/payslip-report/payslip-report.component';
import { YTDReportAdjustmentComponent } from './Reports/Payroll/ytdreport-adjustment/ytdreport-adjustment.component';
import { YTDReportComponent } from './Reports/Payroll/ytdreport/ytdreport.component';
import { ER2Component } from './Reports/Philhealth/er2/er2.component';
import { RF1PDFReportComponent } from './Reports/Philhealth/rf1-pdfreport/rf1-pdfreport.component';
import { RFReportComponent } from './Reports/Philhealth/rfreport/rfreport.component';
import { SSSML1ReportComponent } from './Reports/SSS/sssml1-report/sssml1-report.component';
import { SSSR3ReportComponent } from './Reports/SSS/sssr3-report/sssr3-report.component';
import { SSSR5ReportComponent } from './Reports/SSS/sssr5-report/sssr5-report.component';
import { SSSRL1ReportComponent } from './Reports/SSS/sssrl1-report/sssrl1-report.component';

const routes: Routes = [{ path: '', component: HrComponent },
{path:'HRDashboard',component:HRDashboardComponent},
{path:'EmployeeDashboard',component:EmployeeDashboardComponent},
{path:'SalaryDetailsDash',component:SalaryDetailsDashComponent},
{path:'EmploymentJobHistory',component:EmploymentJobHistoryComponent},
{path:'ExitformalityDash',component:ExitformalityDashComponent},
{path:'BankAdviceList',component:BankAdviceListComponent},
{path:'AttendanceConfigDash',component:AttendanceConfigDashComponent},
{path:'LeaveConfigDash',component:LeaveConfigDashComponent},
{path:'LookAndFeelDash',component:LookAndFeelDashComponent},
{path:'MonthlyAmmortizationReport',component:MonthlyAmmortizationReportComponent},
{path:'MonthlyReport',component:MonthlyReportComponent},
{path:'PayrollSummaryReport',component:PayrollSummaryReportComponent},
{path:'PayslipReport',component:PayslipReportComponent},
{path:'YTDReport',component:YTDReportComponent},
{path:'YTDReportAdjustment',component:YTDReportAdjustmentComponent},
{path:'SSSML1Report',component:SSSML1ReportComponent},
{path:'SSSR3Report',component:SSSR3ReportComponent},
{path:'SSSR5Report',component:SSSR5ReportComponent},
{path:'SSSRL1Report',component:SSSRL1ReportComponent},
{path:'ER2',component:ER2Component},
{path:'RF1PDFReport',component:RF1PDFReportComponent},
{path:'RFReport',component:RFReportComponent},
{path:'M1ExcelReport',component:M1ExcelReportComponent},
{path:'M1MCRFReport',component:M1MCRFReportComponent},
{path:'STLRFExcelReport',component:STLRFExcelReportComponent},
{path:'STLRFReport',component:STLRFReportComponent},
{path:'BIR1601CReport',component:BIR1601CReportComponent},
{path:'BIR1604CFReport',component:BIR1604CFReportComponent},
{path:'BIR1604CReport',component:BIR1604CReportComponent},
{path:'BIR2316Report',component:BIR2316ReportComponent},
{path:'PreliminaryReport',component:PreliminaryReportComponent},
{path:'PayRollDash',component:PayRollDashComponent},
{path:'PayRollRuns',component:PayRollRunsComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HrRoutingModule { }
