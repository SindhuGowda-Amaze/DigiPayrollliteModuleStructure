import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { OtRatesComponent } from './ot-rates/ot-rates.component';
import { OtratesformComponent } from './otratesform/otratesform.component';
import { TaxTableComponent } from './tax-table/tax-table.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'OtRates',component: OtRatesComponent},
  { path: 'TaxTable',component: TaxTableComponent},
  { path: 'Otratesform',component: OtratesformComponent}









];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
