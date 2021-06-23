import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  constructor(private route: ActivatedRoute, public bugservice: BugsService) {
    this.bugsID = this.route.snapshot.paramMap.get('id');
    console.log(this.bugsID);
   }

  ngOnInit(): void {
    this.getBugstatus();
    //this.getBugsType();
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
  }

  //Get Bug Status
  getBugstatus() {
    this.bugservice.getBugstatus().subscribe((res: any) => {
      console.log(res,'status');
      this.bugStatus = res.data
    });
  }

  // //Get Bug Type
  // getBugsType() {
  //   this.bugservice.getBugsType().subscribe((res: any) => {
  //     console.log(res,'type');
      
  //   });
  // }

  //Get Bug Priority
  getBugsPriority() {
    this.bugservice.getBugsPriority().subscribe((res: any) => {
      console.log(res, 'Priority');
      
    });
  }

  onSave(type) {}

}
