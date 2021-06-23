import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LayoutService } from 'app/layouts/layout.service';
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
  bugsID: any
  bugStatus: any = [];
  bugsType: any = [];
  bugsPriority: any = [];
  employeeArray: any = []
  employees: any = [];
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  constructor(
    private route: ActivatedRoute, 
    public bugservice: BugsService,
    public layoutsService: LayoutService) {
    this.bugsID = this.route.snapshot.paramMap.get('id');
    console.log(this.bugsID);
   }

  ngOnInit(): void {
    this.getBugstatus();
    this.getBugsType();
    this.getBugsPriority();

    this.bugsForm = new FormGroup({
      bug_title: new FormControl(null, {
        validators: [Validators.required]
      }),
      developer: new FormControl(null, {
        validators: [Validators.required]
      }),
      bugstatus: new FormControl(null, {
        validators: [Validators.required]
      }),
      bugtype: new FormControl(null, {
        validators: [Validators.required]
      }),
      priority: new FormControl(null, {
        validators: [Validators.required]
      }),
      start_date: new FormControl(null, {
        validators: [Validators.required]
      }),
      bug_description: new FormControl(null, {
        validators: [Validators.required]
      }),
    });
    this.layoutsService.getRolesData().subscribe((res: any) => {
      this.employeeArray = res.userRoles.filter(x => x.role === 'Developer');
      this.getEmployee();
    })
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

  onSave(type) {}

}
