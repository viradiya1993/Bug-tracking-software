import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { EmployeeService } from 'app/layouts/employee/employee.service';
import { LayoutService } from 'app/layouts/layout.service';
import { TechnologyService } from 'app/layouts/technology/technology.service';
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
  private mode = 'create';
  private project_id: string;
  editable = false;
  departments: any = [];
  employees: any = [];
  technologys: any = [];
  start_date: any;
  end_date: any;
  sDate: any;
  eDate: any;
  loader: boolean = false;

  allStatus = [
    { value: 'open', viewValue: 'Open' },
    { value: 'inprogress', viewValue: 'In Progress' },
    { value: 'completed', viewValue: 'Completed' },
    { value: 'putonhold', viewValue: 'Put on Hold' },
    { value: 'cancelled', viewValue: 'Cancelled' }
  ];
  //project = new Projects()

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  projectForm: FormGroup;

  constructor(
    private layoutsService: LayoutService,
    public sharedService: SharedService,
    public empservice: EmployeeService,
    public projectService: ProjectService,
    public technology: TechnologyService,
    public route: ActivatedRoute,
    private router: Router, public datepipe: DatePipe) {

  }

  ngOnInit(): void {
    this.getDepartment();
    this.getEmployee();
    this.getTechnology();
    this.setProjectDetails();

    this.projectForm = new FormGroup({
      project_no: new FormControl(null, {
        validators: [Validators.required]
      }),
      project_name: new FormControl(null, {
        validators: [Validators.required]
      }),
      technology: new FormControl([], {
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

 //Set Project Details
 setProjectDetails() {
  this.route.paramMap.subscribe((paramMap: ParamMap) => {
    if (paramMap.has('id')) {
      this.mode = 'edit';
      this.editable = true;
      this.project_id = paramMap.get('id');
      this.projectService.getProjectDetail(this.project_id).subscribe((projectData: any) => {
        console.log(projectData, 'Project Details');
        let fetachProject = {
          id: projectData._id,
          project_no: projectData.projects.project_no,
          project_name: projectData.projects.project_name,
          // start_date: projectData.project.start_date,
          // end_date: projectData.project.start_date,
          status: projectData.projects.status,
          project_description: projectData.projects.project_description
        }
        this.projectForm.patchValue(fetachProject);
      });
    }
  });
 }

 //Add New Technology
  onAdd(event) {
    console.log(event ,'before')
    if (!event._id) {
      this.technology.addTechnology(event).subscribe((res: any) => {
        console.log(res,'res')
        if (res.id) {
          let newValue = {
            _id: res.id
          }
          console.log(newValue,'new value');
          this.getTechnology();
          // this.projectForm.controls.technology.patchValue([newValue]);
        }
      })
    }

  }

  //Get Department
  getDepartment() {
    this.layoutsService.getDepartmentData().subscribe(res => {
      if (res.userDepartment) {
        this.departments = res.userDepartment;
        //console.log(this.departments,'department')
      }
    });
  }

  //Change Dpeartment
  changeDepartment(department: any) {
    console.log(department, 'department')
  }

  //Get Employee
  getEmployee() {
    this.layoutsService.getEmployee().subscribe((res: any) => {
      if (res.data) {
        this.employees = res.data;
      }
    });

  }

  //select Employee
  selectEmployee(employee: any) {
    console.log(employee, 'emp')
  }

  //Get Technology
  getTechnology() {
    this.layoutsService.getTechnology().subscribe((res: any) => {
      this.technologys = res.data;
    });
  }

  //selectStatus
  selectStatus(status: any) {

  }

  getValues(value) {
    console.log(value, 'item')

  }

  //filterDate
  filterDate() {
    var sdt = moment(this.start_date);
    var edt = moment(this.end_date);
    if (sdt.isValid && edt.isValid) {
      this.sDate = sdt.format("YYYY-MM-DD");
      this.eDate = edt.format("YYYY-MM-DD");
    }
  }

  // Save 
  onSave() {
    // let technologyArray = [];
    // for (let index = 0; index < this.projectForm.value.technology.length; index++) {
    //   const element = this.projectForm.value.technology[index];
    //   let filteredArray = this.technologys.filter(x => x.tech_name == element);
    //   technologyArray.push(filteredArray[0]._id);
    // }
    if (this.projectForm.invalid) {
      return
    }
    let formValue = this.projectForm.value;
    let data = {
      project_no: formValue.project_no,
      project_name: formValue.project_name,
      // technology_id: technologyArray,
      technology_id: formValue.technology,
      departmentId: formValue.department,
      employee_id: formValue.employee,
      start_date: this.sDate,
      end_date: this.eDate,
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
    console.log(data, 'data')
  }
}

/*
choosedDate(type: string, event: MatDatepickerInputEvent<Date>) {
    let begin = this.datepipe.transform(event.value['begin'], 'dd/MM/yyyy');
    let end = this.datepipe.transform(event.value['end'], 'dd/MM/yyyy');
    this.lastFilter.ITEMSTARTDATE = begin;
    this.lastFilter.ITEMENDDATE = end;

    localStorage.setItem('recive_money_DateFilter', JSON.stringify(this.lastFilter));
    this.forListing(this.lastFilter);
  }


    <mat-form-field appearance="outline" class="example pr-4" fxFlex="20">
      <mat-label>Date Range</mat-label>
      <input matInput placeholder="Choose a date" formControlName="DateRange" [satDatepicker]="picker2" (dateInput)="choosedDate('input', $event)" (dateChange)="choosedDate('change', $event)">
      <sat-datepicker #picker2 [rangeMode]="true"> </sat-datepicker>
      <sat-datepicker-toggle matSuffix [for]="picker2"></sat-datepicker-toggle>
    </mat-form-field>

*/