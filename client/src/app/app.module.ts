import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule,Router,Routes} from "@angular/router";
import {FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { MaterializeModule } from 'angular2-materialize';

import { AppComponent } from './app.component';
import { EmployeesComponent } from './employees/employees.component';
import { EditEmployeesComponent } from './edit-employees/edit-employees.component';
import { AddEmployeesComponent } from './add-employees/add-employees.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AddEmployeeModule } from './add-employees/add-employee.module'


const employeesRoutes: Routes = [
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
  { path: 'employees', component: EmployeesComponent, pathMatch: 'full' },
  { path: 'employees/new', component: AddEmployeesComponent},
  { path: 'employees/:id', component: EditEmployeesComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    EditEmployeesComponent,
    AddEmployeesComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule,
    RouterModule.forRoot(
      employeesRoutes,
     // { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
