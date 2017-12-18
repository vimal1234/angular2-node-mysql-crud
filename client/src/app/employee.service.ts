import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Employee} from './employee';
import 'rxjs/add/operator/map'; 
import {Observable} from "rxjs/Observable";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Resolve } from '@angular/router/src/interfaces';


@Injectable()
export class EmployeeService {

  // api url to get the list of employees
  private _getURL = "http://localhost:3000/api/";
  
  constructor(private http: Http) { }

  /// get list of employees
  getEmployees(): Observable<Employee[]> {
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http
        .get('http://localhost:3000/api/',options)
          .map(res => {
              return <Employee[]>res.json();
          })
        
}

/// add new employee
  createEmployee(newEmployee) {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(newEmployee);
    
      return this.http
        .post('http://localhost:3000/api/add', body, options )
          .map(res => res.json()
        );
  }

  /// get employee by id
  getEmployeeById(empId: number): Observable<Employee[]> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    
      return this.http
        .get('http://localhost:3000/api/edit/'+empId,options)
          .map(res => {
            return <Employee[]>res.json();
        })
  
}

/// edit and update employee details
  updateEmployee(updateEmployee:any,id): Observable<Employee[]> {
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(updateEmployee);
    
        return this.http
        .put('http://localhost:3000/api/edit/' +id, body, options )
          .map((res: Response) => res.json()
        );
  }

  /// delete employee
  deleteEmployee(id: number) {
    return this.http.delete('http://localhost:3000/api/delete/' +id);
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
}
}

