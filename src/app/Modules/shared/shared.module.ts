import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SharedComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedRoutingModule
  ],
  exports: [
    FormsModule,


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
