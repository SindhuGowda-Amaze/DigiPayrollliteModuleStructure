import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AnnouncementDashboardComponent } from './Master/announcement-dashboard/announcement-dashboard.component';
import { AnnouncementFormComponent } from './Master/announcement-form/announcement-form.component';
import { BarangayDashComponent } from './Master/barangay-dash/barangay-dash.component';
import { BarangayMasterComponent } from './Master/barangay-master/barangay-master.component';
import { CityMasterDashComponent } from './Master/city-master-dash/city-master-dash.component';
import { CityMasterComponent } from './Master/city-master/city-master.component';
import { CountryMasterDashComponent } from './Master/country-master-dash/country-master-dash.component';
import { CountryMasterComponent } from './Master/country-master/country-master.component';
import { LoanMasterDashComponent } from './Master/loan-master-dash/loan-master-dash.component';
import { LoanMasterComponent } from './Master/loan-master/loan-master.component';
import { PositionDashComponent } from './Master/position-dash/position-dash.component';
import { RoleTypeFormComponent } from './Master/role-type-form/role-type-form.component';
import { StateMasterDashComponent } from './Master/state-master-dash/state-master-dash.component';
import { StateMasterComponent } from './Master/state-master/state-master.component';
import { OtRatesComponent } from './ot-rates/ot-rates.component';
import { OtratesformComponent } from './otratesform/otratesform.component';
import { BankFormComponent } from './Setup/bank-form/bank-form.component';
import { BankComponent } from './Setup/bank/bank.component';
import { CompanyDashboardComponent } from './Setup/company-dashboard/company-dashboard.component';
import { DepartmentFormComponent } from './Master/department-form/department-form.component';
import { DepartmentComponent } from './Master/department/department.component';
import { NewcompanyprofileComponent } from './Setup/newcompanyprofile/newcompanyprofile.component';
import { PayGroupFormComponent } from './Setup/pay-group-form/pay-group-form.component';
import { PayGroupComponent } from './Setup/pay-group/pay-group.component';
import { HolidayDashboardComponent } from './holiday-dashboard/holiday-dashboard.component';
import { HolidayFormComponent } from './holiday-form/holiday-form.component';
import { TaxTableComponent } from './tax-table/tax-table.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: "BankForm", component: BankFormComponent},  
  { path: "Bank", component: BankComponent},
  { path: "BankForm:/id", component: BankFormComponent},  
  { path: "CompanyDashboard", component: CompanyDashboardComponent},
  { path: "NewCompanyProfile/:id", component: NewcompanyprofileComponent},
  { path: "Department", component: DepartmentComponent},
  { path: "DepartmentFrom", component: DepartmentFormComponent},
  { path: "DepartmentFrom/:id", component: DepartmentFormComponent},
  { path: "PayGroup", component: PayGroupComponent},
  { path: "PayGroupFrom", component: PayGroupFormComponent},
  { path: "PayGroupFrom/:id", component: PayGroupFormComponent},
 
  { path: "AnnouncementDashboard", component: AnnouncementDashboardComponent},
  { path: "AnnouncementForm", component:  AnnouncementFormComponent},
  { path: "AnnouncementForm/:id", component: AnnouncementFormComponent},
 
  { path: "BarangayDash", component: BarangayDashComponent},
  { path: "BarangayMaster", component:  BarangayMasterComponent},
  { path: "BarangayMaster/:id", component: BarangayMasterComponent},

  { path: "CityMasterDash", component: CityMasterDashComponent},
  { path: "CityMaster", component:  CityMasterComponent},
  { path: "CityMaster/:id", component: CityMasterComponent},

  { path: "CountryMasterDash", component: CountryMasterDashComponent},
  { path: "CountryMaster", component:  CountryMasterComponent},
  { path: "CountryMaster/:id", component: CountryMasterComponent},

  { path: "LoanMasterDash", component: LoanMasterDashComponent},
  { path: "LoanMaster", component:  LoanMasterComponent},
  { path: "LoanMaster/:id", component: LoanMasterComponent},

  { path: "PositionDash", component: PositionDashComponent},
  { path: "RoleTypeForm", component:  RoleTypeFormComponent},
  { path: "RoleTypeForm/:id", component: RoleTypeFormComponent},

  { path: "StateMasterDash", component: StateMasterDashComponent},
  { path: "StateMaster", component:  StateMasterComponent},
  { path: "StateMaster/:id", component: StateMasterComponent},

  { path: "HolidayDashboard", component:HolidayDashboardComponent},
  { path: "HolidayForm", component:HolidayFormComponent},
  { path: "HolidayForm/:id", component:HolidayFormComponent},
  { path: "TaxTable", component: TaxTableComponent},

  { path: "OtRates", component: OtRatesComponent},
  { path: "OtRatesForm", component:  OtratesformComponent},
 




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
