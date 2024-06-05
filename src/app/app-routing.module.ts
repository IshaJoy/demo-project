import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersListComponent } from './users-list/users-list.component';
import { VmsDashboardComponent } from './vms-dashboard/vms-dashboard.component';
// import { AddUserComponent } from './add-user/add-user.component';

const routes: Routes = [
  {
    component:LoginComponent,path:''
  },
  {
    component:DashboardComponent,path:'dashboard'
  },
  {
    component:UsersListComponent,path:'users'
  },
  {
    component:VmsDashboardComponent,path:'vms'
  }
  // {
  //   component:AddUserComponent,path:'users/add'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
