import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { LoaderComponent } from 'src/app/Pages/CommonPages/loader/loader.component';



@NgModule({
  declarations: [
    SharedComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedRoutingModule,
    Ng2SearchPipeModule
 
  ],
  exports: [
    FormsModule,
    LoaderComponent



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
