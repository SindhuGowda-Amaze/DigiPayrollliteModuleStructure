import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import { ManagerComponent } from './manager.component';
import { MyTeamLeavedetailsComponent } from './ManagerRequest/my-team-leavedetails/my-team-leavedetails.component';
import { MyTeamOvertimedetailsComponent } from './ManagerRequest/my-team-overtimedetails/my-team-overtimedetails.component';
import { TeamExpenseListComponent } from './ManagerRequest/team-expense-list/team-expense-list.component';
import { MyTeamAttendenceComponent } from './TeamRequest-Team Attandence/my-team-attendence/my-team-attendence.component';
import { MyTeamSalaryAdjustmentComponent } from './TeamRequest-Team Attandence/my-team-salary-adjustment/my-team-salary-adjustment.component';
import { MyTeamWeeklyShiftComponent } from './TeamRequest-Team Attandence/my-team-weekly-shift/my-team-weekly-shift.component';
import { StaffShiftMasterFormComponent } from './TeamRequest-Team Attandence/staff-shift-master-form/staff-shift-master-form.component';
import { TeamVaccinationDetailsComponent } from './TeamRequest-Team Attandence/team-vaccination-details/team-vaccination-details.component';
import { UploadAttendenceComponent } from './TeamRequest-Team Attandence/upload-attendence/upload-attendence.component';
import { WeeklyShiftComponent } from './TeamRequest-Team Attandence/weekly-shift/weekly-shift.component';

const routes: Routes = [{ path: '', component: ManagerComponent },

{path:'ManagerDashboard',component:ManagerDashboardComponent},

{path:'MyTeamLeavedetails',component:MyTeamLeavedetailsComponent},
{path:'MyTeamOvertimedetails',component:MyTeamOvertimedetailsComponent},
{path:'TeamExpenseList',component:TeamExpenseListComponent},
{path:'MyTeamSalaryAdjustment',component:MyTeamSalaryAdjustmentComponent},



{path:'MyTeamAttendence',component:MyTeamAttendenceComponent},
{path:'TeamVaccinationDetails',component:TeamVaccinationDetailsComponent},
{path:'UploadAttendence',component:UploadAttendenceComponent},
{path:'WeeklyShift',component:WeeklyShiftComponent},
{path:'MyTeamWeeklyShift',component:MyTeamWeeklyShiftComponent},
{path:'StaffShiftMasterForm',component:StaffShiftMasterFormComponent}



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
