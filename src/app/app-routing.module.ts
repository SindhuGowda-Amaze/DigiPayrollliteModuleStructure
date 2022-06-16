import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/Login', pathMatch: 'full' },
  { path: 'Login', component: LoginComponent },
  { path: 'hr', loadChildren: () => import('./Modules/hr/hr.module').then(m => m.HrModule) },
  { path: 'manager', loadChildren: () => import('./Modules/manager/manager.module').then(m => m.ManagerModule) },
  { path: 'admin', loadChildren: () => import('./Modules/admin/admin.module').then(m => m.AdminModule) },
  { path: 'shared', loadChildren: () => import('./Modules/shared/shared.module').then(m => m.SharedModule) },
  { path: 'employee', loadChildren: () => import('./Modules/employee/employee.module').then(m => m.EmployeeModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
