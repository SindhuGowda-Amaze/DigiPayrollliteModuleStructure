import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { AdminHelpMenuComponent } from './admin-help-menu/admin-help-menu.component';
import { SupportTicketDashboardComponent } from './support-ticket-dashboard/support-ticket-dashboard.component';
import { GaugeModule } from 'angular-gauge';

import { LoaderComponent } from 'src/app/Pages/CommonPages/loader/loader.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { Ng2SearchPipeModule } from 'ng2-search-filter';



@NgModule({
  declarations: [
    SharedComponent,
    AdminHelpMenuComponent,
    SupportTicketDashboardComponent,
    LoaderComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedRoutingModule,
   GaugeModule.forRoot(),
   NgxDropzoneModule,
   NgxPaginationModule,
   Ng2SearchPipeModule

  ],
  exports: [
    FormsModule,
    LoaderComponent,
    NgxDropzoneModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    GaugeModule
 
 
  ],
  
  providers: [
    // {
    //   provide: ConnectionServiceOptionsToken,
    //   useValue: <ConnectionServiceOptions>{
    //     enableHeartbeat: false,
    //     heartbeatUrl: '/assets/ping.json',
    //     requestMethod: 'get',
    //     heartbeatInterval: 3000
    //   }
    // },
    DatePipe,
    
  ]
})
export class SharedModule { }
