import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HrRoutingModule } from './hr-routing.module';
import { HrComponent } from './hr.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    HrComponent
  ],
  imports: [
    CommonModule,
    HrRoutingModule,
    SharedModule
  ]
})
export class HrModule { }
