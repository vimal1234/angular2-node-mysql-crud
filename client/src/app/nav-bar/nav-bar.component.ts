import { Component, OnInit } from '@angular/core';
import { AppModule } from 'app/app.module';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { Injectable } from '@angular/core';


import { EmployeesComponent } from '../employees/employees.component';
import { AddEmployeesComponent } from '../add-employees/add-employees.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
