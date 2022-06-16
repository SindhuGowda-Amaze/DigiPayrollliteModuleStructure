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
    AttendanceConfigDashComponent
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
