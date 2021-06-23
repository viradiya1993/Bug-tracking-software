import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
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
  private project_id: string;
  editable = false;
  departments: any = [];
  employees: any = [];
  technologys: any = [];
  projectManagerArray: any = [];
  projectManager: any = [];
  employeeArray: any = [];
  projectStatus: any = [];
  start_date: any =  new Date();
  end_date: any =  new Date();
  sDate: any;
  eDate: any;
  loader: boolean = false;

  
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
    private router: Router) {
     
  }

  ngOnInit(): void {
    this.getDepartment();
    this.getTechnology();
    this.setProjectDetails();
    this.getStatus();

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
      project_manager: new FormControl(null, {
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
      status: new FormControl('Open', {
        validators: [Validators.required]
      }),
      project_description: new FormControl(null, {
        validators: [Validators.required]
      }),

    });
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
          var sdt = moment(projectData.projects.start_date);
          var edt = moment(projectData.projects.end_date);
          if (sdt.isValid && edt.isValid) {
            this.sDate = sdt.format("YYYY-MM-DD");
            this.eDate = edt.format("YYYY-MM-DD");
          }
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
      }
    });
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
    let formValue = this.projectForm.value;
    let data = {
      project_no: formValue.project_no,
      project_name: formValue.project_name,
      technology_id: technologyArray,
      departmentId: formValue.department,
      project_manager: formValue.project_manager,
      employee_id: employeeArray,
      start_date: this.sDate,
      end_date: this.eDate,
      status: formValue.status,
      project_description: formValue.project_description
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
            console.log(res);
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
}

