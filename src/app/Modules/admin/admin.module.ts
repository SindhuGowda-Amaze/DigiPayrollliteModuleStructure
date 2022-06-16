import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { OtRatesComponent } from './ot-rates/ot-rates.component';
import { TaxTableComponent } from './tax-table/tax-table.component';
import { OtratesformComponent } from './otratesform/otratesform.component';


@NgModule({
  declarations: [
    AdminComponent,
    OtRatesComponent,
    TaxTableComponent,
    OtratesformComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
