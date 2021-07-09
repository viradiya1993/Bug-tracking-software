import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { SharedService } from 'app/shared/shared.service';
import { BugstatusService } from '../bugstatus.service';

@Component({
  selector: 'app-add-status',
  templateUrl: './add-status.component.html',
  styleUrls: ['./add-status.component.css']
})
export class AddStatusComponent implements OnInit {
  private bugStatus_id: string;
  loader = false;
  editable: boolean = false;
  bugStatusForm: FormGroup;

  constructor( 
    private _formBuilder: FormBuilder,
    private router: Router,
    private service: BugstatusService,
    public sharedService: SharedService,
    public route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.bugStatusForm = this._formBuilder.group({
      status: ['', Validators.required],
      colorCtr: [''],
    })

    this.setBugStatusDetails();
  }

  setBugStatusDetails() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.bugStatus_id = paramMap.get('id');
      if (paramMap.has('id')) {
        this.sharedService.showLoader();
        this.editable = true;
        this.service.geBugStatusDetail(this.bugStatus_id).subscribe((bugStatusData: any) => {
          this.sharedService.hideLoader();
          console.log(bugStatusData);
          let fetchData = {
            id: bugStatusData._id,
            status: bugStatusData.bugStatus.status,
            colorCtr: '#'+bugStatusData.bugStatus.color
          }

          this.bugStatusForm.patchValue(fetchData);
        }, err => {
          this.sharedService.loggerError(err.error.error)
          this.sharedService.hideLoader();
        });
      }
    });
  }

  //Save
  onSave(type: any) {
    if (this.bugStatusForm.invalid) {
      return
    }

    if (this.editable === true) {
      var editData = {
        status: this.f.status.value,
        color: this.f.colorCtr.value.hex ? this.f.colorCtr.value.hex : this.f.colorCtr.value.slice(1)
      }
    } else {
       var Savedata = {
        status: this.f.status.value,
        color: this.f.colorCtr.value.hex
      }
    }
    if (!this.loader) {
      this.loader = true
      if (type === 'save') {
        this.service.addBugStatus(Savedata).subscribe((res: any) => {
          if (res) {
            this.loader = false;
            this.bugStatusForm.reset();
            this.sharedService.loggerSuccess(res.message);
            this.router.navigate(['/bugStatus']);
          }
        }, err => {
          this.loader = false
          this.sharedService.loggerError(err.error.message);
        })
      } else {
        this.loader = true;
        this.service.updateBugStatus(editData, this.bugStatus_id).subscribe((res: any) => {
          this.loader = false;
          this.bugStatusForm.reset();
          this.sharedService.loggerSuccess(res.message);
          this.router.navigate(['/bugStatus']);
        }, err => {
          this.loader = false
          this.sharedService.loggerError(err.error.message);
        });
      }
    }
  }

  get f() {
    return this.bugStatusForm.controls;
  }

}
