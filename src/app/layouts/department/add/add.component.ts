import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Department } from 'app/model/department.model';
import { SharedService } from 'app/shared/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DepartmentService } from '../department.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  department = new Department();
  loader = false;
  isEdit = false;
  private departmentId: string;
  @ViewChild(NgForm) myForm: NgForm;
  formDepartment: FormGroup;
  constructor(
    public route: ActivatedRoute,
    private service: DepartmentService,
    public sharedService: SharedService,
    private router: Router,
    private spinner: NgxSpinnerService,
  ) {

  }

  ngOnInit(): void {
    this.formDepartment = new FormGroup({
      department: new FormControl(null, {
        validators: [Validators.required]
      }),
    });
    this.setDepartmentData();
  }


  setDepartmentData() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('departmentId')) {
        this.isEdit = true;
        this.departmentId = paramMap.get('departmentId');
        this.loader = true;
        this.service.getDepartmentById(this.departmentId).subscribe((res: any) => {
          this.loader = false;
          console.log(res);
          this.spinner.hide();
          let fetchedDepartment = res.data.department.department;
          // this.department = res.data.department
          this.formDepartment.controls.department.setValue(fetchedDepartment);
          // console.log(this.department);
        });
      } else {
        this.isEdit = false;
        this.loader = false;
        this.departmentId = null;
        this.spinner.hide();
      }
    });
  }
  //Add Technology
  onSave() {
    if (this.formDepartment.invalid) {
      return;
    }
    let formValue = this.formDepartment.value;

    const data = {
      department: formValue.department,
    }
    if (!this.loader) {
      this.loader = true
      if (this.isEdit) {
        data["id"] = this.departmentId;
        this.service.updateDepartment(data).subscribe((res: any) => {
          if (res) {
            this.loader = false;
            this.router.navigate(['/department']);
            this.formDepartment.reset();
            this.sharedService.loggerSuccess(res.message);
          }
        }, err => {
          this.loader = false;
          this.sharedService.loggerError(err.error.message);
        });
      } else {
        this.service.addDepartment(data).subscribe((res: any) => {
          if (res) {
            this.loader = false;
            this.formDepartment.reset();
            this.sharedService.loggerSuccess(res.message);
            this.router.navigate(['/department']);
          }
        }, err => {
          this.loader = false;
          this.sharedService.loggerError(err.error.message);
        });
      }
    }

  }

  //cancel
  onCancel() {
    this.router.navigate(['/department']);
  }

}
