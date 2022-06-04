import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { ListEmployeesComponent } from './components/list-employees/list-employees.component';
import { CreateEmployeeComponent } from './components/create-employee/create-employee.component';

const routes: Routes = [
  {path: '',redirectTo: 'list-employees',pathMatch: 'full'},
  {path: 'list-employees', component: ListEmployeesComponent},
  {path:'create-employee', component: CreateEmployeeComponent},
  {path:'edit-employee/:id', component: CreateEmployeeComponent},
  {path: '**',redirectTo: 'list-employees',pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
