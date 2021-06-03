import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { LayoutService } from 'app/layouts/layout.service';

import { AppConst } from 'app/app.constant';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  isLoading = false;
  formEmployee: FormGroup;
  isEdit = false;
  private mode = 'create';
  private employeeId: string;
  gendersArray: any = AppConst.genderArray;
  roleArray: [] = [];
  departmentArray: [] = [];
  emailPattern = AppConst.emailValidationPattern;
  mobilePattern = AppConst.mobileValidationPatter;
  emailError = false;
  mobileError = false;
  constructor(
    public route: ActivatedRoute,
    private service: EmployeeService,
    private layoutService: LayoutService,
    private spinner: NgxSpinnerService,
    private location: Location
  ) {
    this.spinner.show();
    this.getDepartment();
    this.getRoles();
  }

  ngOnInit(): void {

    // this.authListerSub = this.authService.getAuthStatusLister().subscribe(authStatus => {
    //   this.isLoading = false;
    // })
    this.formEmployee = new FormGroup({
      first_name: new FormControl(null, {
        validators: [Validators.required]
      }),
      middle_name: new FormControl(null),
      last_name: new FormControl(null, {
        validators: [Validators.required]
      }),
      gender: new FormControl(null, {
        validators: [Validators.required]
      }),
      email: new FormControl(null, {
        validators: [Validators.required, Validators.pattern(this.emailPattern)]
      }),
      mobile_number: new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(10), Validators.minLength(10)]
      }),
      department: new FormControl(null, {
        validators: [Validators.required]
      }),
      role: new FormControl(null, {
        validators: [Validators.required]
      })
    });
    this.setEmployeeData();
  }

  setEmployeeData() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('employeeId')) {
        this.mode = 'edit';
        this.isEdit = true;
        this.employeeId = paramMap.get('employeeId');
        this.isLoading = true;
        this.service.getEmployeeById(this.employeeId).subscribe((employeeData: any) => {
          this.isLoading = false;
          console.log(employeeData);
          this.spinner.hide();
          let fetchedData = {
            id: employeeData._id,
            first_name: employeeData.first_name,
            middle_name: employeeData.middle_name,
            last_name: employeeData.last_name,
            gender: Number(employeeData.gender),
            email: (employeeData.email),
            mobile_number: Number(employeeData.mobile_number),
            department: (employeeData.departmentId),
            role: (employeeData.roleId)
          };
          this.formEmployee.patchValue(fetchedData);
        });
      } else {
        this.mode = 'create';
        this.isEdit = false;
        this.employeeId = null;
        this.spinner.hide();
      }
    });
  }

  getDepartment() {
    this.layoutService.getDepartmentData().subscribe(res => {
      console.log(res);
      if (res.userDepartment) {
        this.departmentArray = res.userDepartment;
      }
      // this.getRoles();
      console.log(this.departmentArray);
    });
  }

  getRoles() {
    this.layoutService.getRolesData().subscribe(res => {
      console.log(res);
      if (res.userRoles) {
        this.roleArray = res.userRoles;
      }
      // this.setEmployeeData();
    });
  }

  onSave() {
    console.log(this.formEmployee.value);
    if (this.formEmployee.invalid) {
      return;
    }
    this.spinner.show();
    let formValue = this.formEmployee.value;
    let data = {
      department: formValue.department,
      departmentId: formValue.department,
      email: formValue.email,
      first_name: formValue.first_name,
      gender: formValue.gender,
      last_name: formValue.last_name,
      middle_name: formValue.middle_name,
      mobile_number: Number(formValue.mobile_number),
      role: formValue.role,
      roleId: formValue.role,
    }
    console.log(data);

    if (this.mode === 'create') {
      this.service.addEmployee(data).subscribe((res: any) => {
        console.log(res);
        this.spinner.hide();
        if (res.status = 200) {
          this.formEmployee.reset();
          this.location.back();
        }
      }, (err) => {
        this.spinner.hide();
        console.log(err);
        if (err.error.errorType == "Email") {
          this.emailErrorOccured();
        }
        if (err.error.errorType == "Mobile") {
          this.moileErrorOccured();
        }
      })
      // alert("Post Craeted Succesfully")
    } else {
      // this.service.updatePost(
      //   this.postId,
      //   this.formEmployee.value.title,
      //   this.formEmployee.value.content,
      //   this.formEmployee.value.image
      // );
      // alert("Post Updated Succesfully");
    }
  }

  emailErrorOccured() {
    setTimeout(() => {
      this.emailError = false;
    }, 5000);
    this.emailError = true;
  }
  moileErrorOccured() {
    setTimeout(() => {
      this.mobileError = false;
    }, 5000);
    this.mobileError = true;
  }

}

