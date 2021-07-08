import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  // gendersArray: any = AppConst.genderArray;
  gendersArray: [] = [];
  roleArray: [] = [];
  departmentArray: [] = [];
  employeeStatus: any = [];
  emailPattern = AppConst.emailValidationPattern;
  mobilePattern = AppConst.mobilePattern;
  emailError = false;
  mobileError = false;
  submitted = false;
  constructor(
    public route: ActivatedRoute,
    private service: EmployeeService,
    private layoutService: LayoutService,
    private spinner: NgxSpinnerService,
    private location: Location,
    private formBuilder: FormBuilder
  ) {
    this.spinner.show();
    this.getDepartment();
    this.getRoles();
    this.getGender();
    this.getEmpStatus();
  }

  ngOnInit(): void {

    // this.authListerSub = this.authService.getAuthStatusLister().subscribe(authStatus => {
    //   this.isLoading = false;
    // })
    this.formEmployee = this.formBuilder.group({
      first_name: ['', Validators.required],
      middle_name: [],
      last_name: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      mobile_number: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern(this.mobilePattern)]],
      department: ['', Validators.required],
      role: ['', Validators.required],
      status: ['', Validators.required]
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
          console.log(employeeData);

          this.isLoading = false;
          this.spinner.hide();
          let fetchedData = {
            id: employeeData._id,
            first_name: employeeData.first_name,
            middle_name: employeeData.middle_name,
            last_name: employeeData.last_name,
            gender: (employeeData.gender),
            email: (employeeData.email),
            status: employeeData.status,
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

  get f() { return this.formEmployee.controls; }

  getDepartment() {
    this.layoutService.getDepartmentData().subscribe(res => {
      if (res.userDepartment) {
        this.departmentArray = res.userDepartment;
      }
      // this.getRoles();
      // console.log(this.departmentArray);
    });
  }

  getRoles() {
    this.layoutService.getRolesData().subscribe(res => {
      // console.log(res);
      if (res.userRoles) {
        this.roleArray = res.userRoles;
      }
      // this.setEmployeeData();
    });
  }

  getEmpStatus() {
    this.layoutService.getEmpStatus().subscribe((res: any) => {
      this.employeeStatus = res.status
    });
  }

  getGender() {
    this.layoutService.getGenderData().subscribe((res: any) => {
      // console.log(res);
      if (res.data) {
        this.gendersArray = res.data;
      }
      // this.setEmployeeData();
    });
  }

  onSave() {
    this.submitted = true;
    // console.log(this.formEmployee);
    // console.log(typeof (this.formEmployee.controls.mobile_number.value) == 'string');

    if (this.formEmployee.invalid) {
      return;
    }

    this.spinner.show();
    let formValue = this.formEmployee.value;
    let data = {
      department: formValue.department,
      departmentId: formValue.department,
      email: formValue.email,
      status: formValue.status,
      first_name: formValue.first_name,
      gender: formValue.gender,
      last_name: formValue.last_name,
      middle_name: formValue.middle_name,
      mobile_number: Number(formValue.mobile_number),
      role: formValue.role,
      roleId: formValue.role,
    }


    if (this.mode === 'create') {
      this.service.addEmployee(data).subscribe((res: any) => {
        if (res.status = 200) {
          this.location.back();
          this.spinner.hide();
          this.formEmployee.reset();
        }
      }, (err) => {
        this.spinner.hide();
        // console.log(err);
        if (err.error.errorType == "Email") {
          this.emailErrorOccured();
        }
        if (err.error.errorType == "Mobile") {
          this.moileErrorOccured();
        }
      });
      // alert("Post Craeted Succesfully")
    } else {
      data["id"] = this.employeeId;
      this.service.editEmployee(data, this.employeeId).subscribe((res: any) => {
        if (res.status = 200) {
          this.location.back();
          this.spinner.hide();
          this.formEmployee.reset();
        }
      }, (err) => {
        this.spinner.hide();
        // console.log(err);
        if (err.error.errorType == "Email") {
          this.emailErrorOccured();
        }
        if (err.error.errorType == "Mobile") {
          this.moileErrorOccured();
        }
      });
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

