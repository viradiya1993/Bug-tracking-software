import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
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
  private project_id: string;
  editable: boolean = false;
  departments: any = [];
  employees: any = [];
  technologys: any = [];
  projectManagerArray: any = [];
  projectManager: any = [];
  employeeArray: any = [];
  projectStatus: any = [];
  sDate: any;
  eDate: any;
  loader: boolean = false;
  selected = '';

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
    public datepipe: DatePipe,
    private _formBuilder: FormBuilder,
    private router: Router) {

  }

  ngOnInit(): void {
    this.projectForm = this._formBuilder.group({
      project_no: ['', Validators.required],
      project_name: ['', Validators.required],
      technology: ['', Validators.required],
      department: ['', Validators.required],
      project_manager: ['', Validators.required],
      employee: ['', Validators.required],
      start_date: [new Date()],
      end_date: [new Date()],
      status: ['', Validators.required],
      project_description: ['', Validators.required],
      sdate: [this.datepipe.transform(new Date(), 'yyyy-MM-dd')],
      edate: [this.datepipe.transform(new Date(), 'yyyy-MM-dd')],
    })

    this.getDepartment();
    this.getTechnology();
    this.setProjectDetails();
    this.getStatus();
  
    this.projectForm.controls['start_date'].disable();
    this.layoutsService.getRolesData().subscribe((res: any) => {
      this.projectManagerArray = res.userRoles.filter(x => x.role === 'Project Manager');
      this.employeeArray = res.userRoles.filter(x => x.role === 'Developer');
      this.getEmployee();
      this.getProject();
    })
  }
 
  //Set Project Details
  setProjectDetails() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.project_id = paramMap.get('id');
      if (paramMap.has('id')) {
        this.sharedService.showLoader();
        this.editable = true;
        this.projectService.getProjectDetail(this.project_id).subscribe((projectData: any) => {
          this.sharedService.hideLoader();
          this.sDate = this.datepipe.transform(projectData.projects.start_date, 'yyyy-MM-dd');
          this.eDate = this.datepipe.transform(projectData.projects.end_date, 'yyyy-MM-dd');
          let fetachProject = {
            id: projectData._id,
            project_no: projectData.projects.project_no,
            project_name: projectData.projects.project_name,
            technology: projectData.projects.technology_id,
            department: projectData.projects.departmentId,
            project_manager: projectData.projects.project_manager,
            employee: projectData.projects.employee_id,
            start_date: this.sDate,
            end_date: this.eDate,
            status: projectData.projects.status,
            project_description: projectData.projects.project_description
          }
          this.projectForm.patchValue(fetachProject);
        }, err => {
          this.sharedService.loggerError(err.error.error)
          this.sharedService.hideLoader();
        });
      }
    });
  }

  //Add New Technology
  onAdd(event) {
    if (!event._id) {
      this.technology.addTechnology(event).subscribe((res: any) => {
        if (res.id) {
          let newValue = {
            _id: res.id
          }
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
      }
    });
  }

  //Get Employee
  getEmployee() {
    let data = {
      roleId: this.employeeArray[0]._id
    }
    this.layoutsService.getEmployee(data).subscribe((res: any) => {
      if (res.employeeLists) {
        this.employees = res.employeeLists;
      }
    });

  }

  //Get Project Manager
  getProject() {
    let data = {
      roleId: this.projectManagerArray[0]._id
    }
    this.layoutsService.getEmployee(data).subscribe((res: any) => {
      if (res.employeeLists) {
        this.projectManager = res.employeeLists;
      }
    });
  }

  //Get Technology
  getTechnology() {
    this.layoutsService.getTechnology().subscribe((res: any) => {
      this.technologys = res.data;
    });
  }

  //get Status
  getStatus() {
    this.projectService.getProjectStatus().subscribe((res: any) => {
      if (res.status) {
        this.projectStatus = res.status
        var index = this.projectStatus.findIndex(x => x.value == "Open");
        this.selected = this.projectStatus[index]._id
        this.projectForm.controls['status'].setValue(this.selected)
        this.editable ? this.projectForm.controls['status'].enable() : this.projectForm.controls['status'].disable()
      }
    });
  }

  startDate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.projectForm.controls['sdate'].setValue(this.datepipe.transform(event.value, 'yyyy-MM-dd'))
  }
  
  endDate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.projectForm.controls['edate'].setValue(this.datepipe.transform(event.value, 'yyyy-MM-dd'));
  }

  // Save 
  onSave(type) {
    let technologyArray = [];
    let employeeArray = [];
    for (let index = 0; index < this.projectForm.value.technology.length; index++) {
      const element = this.projectForm.value.technology[index];
      let filteredArray = this.technologys.filter(x => x.tech_name == element);
      technologyArray.push(filteredArray[0]._id);
    }

    for (let i = 0; i < this.projectForm.value.employee.length; i++) {
      const element = this.projectForm.value.employee[i];
      let filterEmp = this.employees.filter(e => e.first_name == element);
      employeeArray.push(filterEmp[0]._id);
    }

    if (this.projectForm.invalid) {
      return
    }
   
    let data = {
      project_no: this.f.project_no.value,
      project_name: this.f.project_name.value,
      technology_id: technologyArray,
      departmentId: this.f.department.value,
      project_manager: this.f.project_manager.value,
      employee_id: employeeArray,
      start_date: this.f.sdate.value,
      end_date: this.f.edate.value,
      status: this.f.status.value,
      project_description: this.f.project_description.value
    }
    if (!this.loader) {
      this.loader = true;
      if (type === 'save') {
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
      } else {
        this.loader = true;
        this.projectService.updateProject(data, this.project_id).subscribe((res: any) => {
          this.loader = false;
          this.projectForm.reset();
          this.sharedService.loggerSuccess(res.message);
          this.router.navigate(['/project']);
        }, err => {
          this.loader = false
          this.sharedService.loggerError(err.error.message);
        });
      }
    }
  }

  get f() {
    return this.projectForm.controls;
  }
}

