import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'app/layouts/employee/employee.service';
import { LayoutService } from 'app/layouts/layout.service';
import { Projects } from 'app/model/projects.model';
import { SharedService } from 'app/shared/shared.service';
import * as moment from 'moment';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  departments: [] = [];
  employees:[] = [];
  technologys:[] = [];
  sDate: any;
  eDate: any;
  loader: boolean = false;
  allStatus = [
    {value: 'open', viewValue: 'Open'},
    {value: 'inprogress', viewValue: 'In Progress'},
    {value: 'completed', viewValue: 'Completed'},
    {value: 'putonhold', viewValue: 'Put on Hold'},
    {value: 'cancelled', viewValue: 'Cancelled'}
  ];
  
  @ViewChild(NgForm) myForm: NgForm;
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  projectForm: FormGroup;
  constructor(
    private layoutsService: LayoutService,
    public sharedService: SharedService,
    public empservice: EmployeeService,
    public projectService: ProjectService,
    private router: Router) { }

  ngOnInit(): void {
    this.getDepartment();
    this.getEmployee();
    this.getTechnology();

    this.projectForm = new FormGroup({
      project_no: new FormControl(null, {
        validators: [Validators.required]
      }),
      project_name: new FormControl(null, {
        validators: [Validators.required]
      }),
      technology: new FormControl(null, {
        validators: [Validators.required]
      }),
      department: new FormControl(null, {
        validators: [Validators.required]
      }),
      employee: new FormControl(null, {
        validators: [Validators.required]
      }),
      start_date: new FormControl(null, {
        validators: [Validators.required]
      }),
      end_date: new FormControl(null, {
        validators: [Validators.required]
      }),
      status: new FormControl(null, {
        validators: [Validators.required]
      }),
      project_description: new FormControl(null, {
        validators: [Validators.required]
      }),
      
    });
  }
  CreateNew() {
    //alert('ok')
  }
  //Get Department
  getDepartment() {
    this.layoutsService.getDepartmentData().subscribe(res => {
      if (res.userDepartment) {
        this.departments = res.userDepartment;
        console.log(this.departments,'department')
      }
    });
  }

  //Change Dpeartment
  changeDepartment(department: any) {
    console.log(department,'department')
  }
  
  //Get Employee
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

  //Get Technology
   getTechnology() {
     this.projectService.getTechnology().subscribe((res: any) => {
       console.log(res)
       if (res.data) {
         this.technologys = res.data;
       }
       console.log(this.technologys,'tech')
     });
   }

  //selectStatus
  selectStatus(status: any) {

  }

  getValues() {
    // console.log(item._id, 'item')
    // console.log(this.project.technology,'get chnage');
  }

  //filterDate
  filterDate() {
    // console.log(this.projectForm.value.start_date);
    // if (this.projectForm.value.start_date !== undefined && this.projectForm.value.end_date && this.projectForm.value.start_date !== '' && this.projectForm.value.end_date !== '') {
     
    //   this.sDate = moment(this.projectForm.value.start_date).format("dd/MM/yyyy")
    //   this.eDate = moment(this.projectForm.value.end_date).format("dd/MM/yyyy")
      
    // }
    // console.log(this.sDate);
    // console.log(this.eDate);
  }

  // Save 
  onSave() {
   // console.log(this.projectForm.value);
    if (this.projectForm.invalid) {
      return
    }
    let formValue = this.projectForm.value;

    let data = {
      project_no : formValue.project_no,
      project_name: formValue.project_name,
      technology_id: formValue.technology,
      department_id: formValue.department,
      employee_id: formValue.employee,
      start_date: formValue.start_date,
      end_date: formValue.end_date,
      status: formValue.status,
      project_description: formValue.project_description
    }
    if (!this.loader) {
      this.loader = true;
      this.projectService.addProject(data).subscribe((res: any) => {
        if (res) {
          this.loader = false;
          this.projectForm.reset();
          this.sharedService.loggerSuccess(res.message);
          this.router.navigate(['/project']);
        } 
      }, err => {
        this.loader = false
        this.sharedService.loggerError(err.error.message);
      });
    }
    console.log(data,'data')
  }
}
