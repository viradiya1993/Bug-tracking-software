import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutService } from 'app/layouts/layout.service';
import { SharedService } from 'app/shared/shared.service';
import { BugsService } from '../bugs.service';

@Component({
  selector: 'app-add-bugs',
  templateUrl: './add-bugs.component.html',
  styleUrls: ['./add-bugs.component.css']
})
export class AddBugsComponent implements OnInit {
  bugsForm: FormGroup;
  editable = false
  loader: boolean = false;
  start_date: any =  new Date();
  bugsID: any
  bugStatus: any = [];
  bugsType: any = [];
  bugsPriority: any = [];
  employeeArray: any = []
  employees: any = [];
  projects: any = [];
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  constructor(
    private route: ActivatedRoute, 
    public bugservice: BugsService,
    public layoutsService: LayoutService,
    private _formBuilder: FormBuilder,
    public sharedService: SharedService,
    public datepipe: DatePipe,
    private router: Router) {
    this.bugsID = this.route.snapshot.paramMap.get('id');
    console.log(this.bugsID);
   }

  ngOnInit(): void {
    this.bugsForm = this._formBuilder.group({
      bug_title: ['', Validators.required],
      developer: ['', Validators.required],
      bugstatus: ['', Validators.required],
      project: ['', Validators.required],
      bugtype: ['', Validators.required],
      priority: ['', Validators.required],
      start_date: [new Date()],
      bug_description: ['', Validators.required],
      sdate: [this.datepipe.transform(new Date(), 'yyyy-MM-dd')],
    })

    this.getBugstatus();
    this.getBugsType();
    this.getBugsPriority();
    this.getProject(); 

    this.layoutsService.getRolesData().subscribe((res: any) => {
      this.employeeArray = res.userRoles.filter(x => x.role === 'Developer');
      this.getEmployee();
    })
  }
  
  //Get project
  getProject() {
    this.layoutsService.getProject().subscribe((res: any) => {
      if (res) {
        this.projects = res.data;
      }
    });
  }

  //Get Bug Status
  getBugstatus() {
    this.bugservice.getBugstatus().subscribe((res: any) => {
      this.bugStatus = res.data
    });
  }

  //Get Bug Type
  getBugsType() {
    this.bugservice.getBugsType().subscribe((res: any) => {
      this.bugsType = res.data;
    });
  }

  //Get Bug Priority
  getBugsPriority() {
    this.bugservice.getBugsPriority().subscribe((res: any) => {
      this.bugsPriority = res.data;
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

  startDate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.bugsForm.controls['sdate'].setValue(this.datepipe.transform(event.value, 'yyyy-MM-dd'))
  }

  onSave(type) {
    let employeeArray = [];
    for (let i = 0; i < this.bugsForm.value.developer.length; i++) {
      const element = this.bugsForm.value.developer[i];
      let filterEmp = this.employees.filter(e => e.first_name == element);
      employeeArray.push(filterEmp[0]._id);
    }
   
    let data = {
      bug_title: this.f.bug_title.value,
      employee_id: employeeArray,
      bug_status: this.f.bugstatus.value,
      project_id: this.f.project.value,
      bug_type: this.f.bugtype.value,
      bug_priority: this.f.priority.value,
      start_date: this.f.sdate.value,
      bug_description: this.f.bug_description.value,
    }
    console.log(data,'final');
    if (!this.loader) {
      this.loader = true
      if (type === 'save') {
        this.bugservice.addBug(data).subscribe((res: any) => {
          if (res) {
            this.loader = false;
            this.bugsForm.reset();
            this.sharedService.loggerSuccess(res.message);
            this.router.navigate(['/bugs']);
          }
        }, err => {
            this.loader = false
            this.sharedService.loggerError(err.error.message);
        });
      }
    }
  }
  
  get f() {
    return this.bugsForm.controls;
  }
}
