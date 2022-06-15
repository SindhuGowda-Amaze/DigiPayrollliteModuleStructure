import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerComponent } from './manager.component';
import { SharedModule } from '../shared/shared.module';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import { MyTeamLeavedetailsComponent } from './ManagerRequest/my-team-leavedetails/my-team-leavedetails.component';
import { MyTeamOvertimedetailsComponent } from './ManagerRequest/my-team-overtimedetails/my-team-overtimedetails.component';
import { MyTeamAttendenceComponent } from './TeamRequest-Team Attandence/my-team-attendence/my-team-attendence.component';
import { UploadAttendenceComponent } from './TeamRequest-Team Attandence/upload-attendence/upload-attendence.component';
import { TeamVaccinationDetailsComponent } from './TeamRequest-Team Attandence/team-vaccination-details/team-vaccination-details.component';
import { TeamExpenseListComponent } from './ManagerRequest/team-expense-list/team-expense-list.component';
import { WeeklyShiftComponent } from './TeamRequest-Team Attandence/weekly-shift/weekly-shift.component';
import { MyTeamSalaryAdjustmentComponent } from './TeamRequest-Team Attandence/my-team-salary-adjustment/my-team-salary-adjustment.component';
import { GaugeModule } from 'angular-gauge';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    ManagerComponent,
    ManagerDashboardComponent,
    MyTeamLeavedetailsComponent,
    MyTeamOvertimedetailsComponent,
    MyTeamAttendenceComponent,
    UploadAttendenceComponent,
    TeamVaccinationDetailsComponent,
    TeamExpenseListComponent,
    WeeklyShiftComponent,
    MyTeamSalaryAdjustmentComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    SharedModule,

  ]
})
export class ManagerModule { }
