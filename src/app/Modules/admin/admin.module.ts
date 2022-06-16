import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { DepartmentComponent } from './Master/department/department.component';
import { BankComponent } from './Setup/bank/bank.component';
import { PayGroupComponent } from './Setup/pay-group/pay-group.component';
import { NewcompanyprofileComponent } from './Setup/newcompanyprofile/newcompanyprofile.component';
import { CompanyDashboardComponent } from './Setup/company-dashboard/company-dashboard.component';
import { DepartmentFormComponent } from './Master/department-form/department-form.component';
import { BankFormComponent } from './Setup/bank-form/bank-form.component';
import { PayGroupFormComponent } from './Setup/pay-group-form/pay-group-form.component';
import { AnnouncementDashboardComponent } from './Master/announcement-dashboard/announcement-dashboard.component';
import { AnnouncementFormComponent } from './Master/announcement-form/announcement-form.component';
import { PositionDashComponent } from './Master/position-dash/position-dash.component';
import { RoleTypeFormComponent } from './Master/role-type-form/role-type-form.component';
import { CountryMasterDashComponent } from './Master/country-master-dash/country-master-dash.component';
import { CountryMasterComponent } from './Master/country-master/country-master.component';
import { StateMasterDashComponent } from './Master/state-master-dash/state-master-dash.component';
import { StateMasterComponent } from './Master/state-master/state-master.component';
import { CityMasterDashComponent } from './Master/city-master-dash/city-master-dash.component';
import { CityMasterComponent } from './Master/city-master/city-master.component';
import { BarangayDashComponent } from './Master/barangay-dash/barangay-dash.component';
import { BarangayMasterComponent } from './Master/barangay-master/barangay-master.component';
import { LoanMasterDashComponent } from './Master/loan-master-dash/loan-master-dash.component';
import { LoanMasterComponent } from './Master/loan-master/loan-master.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HolidayDashboardComponent } from './holiday-dashboard/holiday-dashboard.component';
import { HolidayFormComponent } from './holiday-form/holiday-form.component';

@NgModule({
  declarations: [
    AdminComponent,
    DepartmentComponent,
    BankComponent,
    PayGroupComponent,
    NewcompanyprofileComponent,
    CompanyDashboardComponent,
    DepartmentFormComponent,
    BankFormComponent,
    PayGroupFormComponent,
    AnnouncementDashboardComponent,
    AnnouncementFormComponent,
    PositionDashComponent,
    RoleTypeFormComponent,
    CountryMasterDashComponent,
    CountryMasterComponent,
    StateMasterDashComponent,
    StateMasterComponent,
    CityMasterDashComponent,
    CityMasterComponent,
    BarangayDashComponent,
    BarangayMasterComponent,
    LoanMasterDashComponent,
    LoanMasterComponent,
    HolidayDashboardComponent,
    HolidayFormComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    Ng2SearchPipeModule,
  ],
})
export class AdminModule {}
