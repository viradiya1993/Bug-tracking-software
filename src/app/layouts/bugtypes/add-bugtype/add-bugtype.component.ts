import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { SharedService } from 'app/shared/shared.service';
import { BugtypeService } from '../bugtype.service';

@Component({
  selector: 'app-add-bugtype',
  templateUrl: './add-bugtype.component.html',
  styleUrls: ['./add-bugtype.component.css']
})
export class AddBugtypeComponent implements OnInit {
  private bugType_id: string;
  loader = false;
  editable: boolean = false;
  bugTypeForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private service: BugtypeService,
    public sharedService: SharedService,
    public route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.bugTypeForm = this._formBuilder.group({
      bug_types: ['', Validators.required]
    })
    this.setBugTypeDetail();
  }

  setBugTypeDetail() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.bugType_id = paramMap.get('id');
      if (paramMap.has('id')) {
        this.sharedService.showLoader();
        this.editable = true;
        this.service.geBugTypeDetail(this.bugType_id).subscribe((bugTypeData: any) => {
          this.sharedService.hideLoader();
          let fetchData = {
            id: bugTypeData._id,
            bug_types: bugTypeData.bugType.bug_types,
          }
          this.bugTypeForm.patchValue(fetchData);
        }, err => {
          this.sharedService.loggerError(err.error.error)
          this.sharedService.hideLoader();
        });
      }
    });
  }

  //Save
  onSave(type) {
    if (this.bugTypeForm.invalid) {
      return
    }
    let data = {
      bug_types: this.f.bug_types.value,
    }
    if (!this.loader) {
      this.loader = true;
      if (type === 'save') {
        this.service.addBugType(data).subscribe((res: any) => {
          if (res) {
            this.loader = false;
            this.bugTypeForm.reset();
            this.sharedService.loggerSuccess(res.message);
            this.router.navigate(['/bugsType']);
          }
        }, err => {
          this.loader = false
          this.sharedService.loggerError(err.error.message);
        });
      } else {
        this.loader = true;
        this.service.updateBugType(data, this.bugType_id).subscribe((res: any) => {
          this.loader = false;
          this.bugTypeForm.reset();
          this.sharedService.loggerSuccess(res.message);
          this.router.navigate(['/bugsType']);
        }, err => {
          this.loader = false
          this.sharedService.loggerError(err.error.message);
        });
      }
    }
  }

  get f() {
    return this.bugTypeForm.controls;
  }

}
