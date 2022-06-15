import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHelpMenuComponent } from './admin-help-menu/admin-help-menu.component';
import { SharedComponent } from './shared.component';
import { SupportTicketDashboardComponent } from './support-ticket-dashboard/support-ticket-dashboard.component';

const routes: Routes = [{ path: '', component: SharedComponent },
{path:'AdminHelpMenu',component:AdminHelpMenuComponent},
{path:'SupportTicketDashboard',component:SupportTicketDashboardComponent}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
