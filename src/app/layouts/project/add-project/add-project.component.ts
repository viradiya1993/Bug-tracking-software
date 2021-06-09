import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'app/layouts/employee/employee.service';
import { LayoutService } from 'app/layouts/layout.service';
import { Projects } from 'app/model/projects.model';
import { SharedService } from 'app/shared/shared.service';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  project = new Projects();
  departments: [] = [];
  employees:[] = [];
  @ViewChild(NgForm) myForm: NgForm;
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  constructor(
    private layoutsService: LayoutService,
    public sharedService: SharedService,
    public empservice: EmployeeService,
    public projectService: ProjectService,
    private router: Router) { }

  ngOnInit(): void {
    this.getDepartment();
    this.getEmployee();
  }

  //Get Department
  getDepartment() {
    this.layoutsService.getDepartmentData().subscribe(res => {
      if (res.userDepartment) {
        this.departments = res.userDepartment;
      }
    });
  }

  //Change Dpeartment
  changeDepartment(department: any) {
    console.log(department,'department')
  }
  
  getEmployee() {
    this.projectService.getEmployee().subscribe((res: any) => {
      if (res.data) {
        this.employees = res.data;
      }
    });
    
  }

  //select Employee
  selectEmployee(employee: any) {
    console.log(employee,'emp')
  }
  
  // Save 
  onSave(form: NgForm) {
    if (form.invalid) {
      return
    }
  }
}
