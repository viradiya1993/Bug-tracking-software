import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { LayoutService } from 'app/layouts/layout.service';
import { mimeType } from 'app/shared/mime-type.validator';
import { SharedService } from 'app/shared/shared.service';
import { BugsService } from '../bugs.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  loader: boolean = false;
  employeeArray: any = []
	employees: any = [];
  imgArr = [];
  fileArr = [];
  fileObj = [];
  bugStatus: any = [];
  commets: any = [];
  comments: FormGroup;
  bugDetails_id: any
  bugTitle: any;
  bugDetails: any;
  files: File[] = [];
  imagePreview: any;
  @ViewChild("ckeditor") ckeditor: any;
  constructor(
    public sharedService: SharedService,
    private _formBuilder: FormBuilder,
    public bugservice: BugsService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    public layoutsService: LayoutService) {
    this.bugDetails_id = this.route.snapshot.paramMap.get('id');
    this.bugTitle = localStorage.getItem('bugTitle')
    this.sharedService.showLoader();
    
  }
  ngOnInit(): void {
    this.comments = this._formBuilder.group({
      bugstatus: ['', Validators.required],
      developer: ['', Validators.required],
      task_description: [''],
      fileSource: ['', [Validators.required]],
      file: ['']
    })
    this.getBugstatus();
    this.getComments();
    this.setBugsDetails();
    this.layoutsService.getRolesData().subscribe((res: any) => {
      this.employeeArray = res.userRoles.filter(x => x.role === 'Developer');
      this.getEmployee();
    })

  }

  //Set Bug Details
  setBugsDetails() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.bugDetails_id = paramMap.get('id');
        this.sharedService.showLoader();
        this.bugservice.getBugsDetail(this.bugDetails_id).subscribe((bugData: any) => {
          console.log(bugData,'inside cimment');
          this.sharedService.hideLoader();
           this.bugDetails = bugData.bugDetails;
           this.comments.controls.bugstatus.setValue(bugData.bugDetails.bug_status)
           this.comments.controls.developer.setValue(bugData.bugDetails.employee_id)
        })
      }
    })
  }
  //Get Employee
  getEmployee() {
    let data = {
      roleId: this.employeeArray[0]._id
    }
    this.layoutsService.getEmployee(data).subscribe((res: any) => {
      if (res.employeeLists) {
        res.employeeLists.forEach(element => {
          this.employees.push({
            value: element.first_name + ' ' + element.last_name + ' (' + element.email + ')',
            first_name: element.first_name,
            _id: element._id
          });
        });
        // this.employees = res.employeeLists;
      }
    });

  }

  //Get Bug Status
  getBugstatus() {
    this.bugservice.getBugstatus().subscribe((res: any) => {
      this.bugStatus = res.data
    });
  }



  getComments() {
    this.bugservice.getComments().subscribe((res: any) => {
      if (res) {
        this.sharedService.hideLoader()
        this.commets = res.data;
      }
    });
  }



  onSave() {
    const formData = new FormData();
    formData.append('bug_status', this.f.bugstatus.value);
    formData.append('task_description', this.f.task_description.value);
    formData.append('employee_id', this.f.developer.value);
    formData.append('image', this.f.fileSource.value);
    this.f.fileSource.value.forEach((item, i) => {
      formData.append('image', this.f.fileSource.value[i])
      console.log(this.f.fileSource.value[i]);
    })

    console.log(this.f.fileSource.value, 'onsave');
    
 //    return;
    if (!this.loader) {
      this.loader = true
      this.bugservice.addComments(formData).subscribe((res: any) => {
        if (res) {
          this.loader = false;
          this.ckeditor.instance.setData('');
          this.comments.reset();
          this.fileArr = [];
          this.getComments();
          this.sharedService.loggerSuccess(res.message);
        }
      }, err => {
        this.loader = false
        this.sharedService.loggerError(err.error.message);
      });
    }
    this.updateBugStatus();
  }



  multipleUpload(e) {
    
    
    // const file = (e.target as HTMLInputElement).files[0];
  
    // const reader = new FileReader();
    // reader.onload = () => {
      //this.imagePreview = reader.result as string;
    //  console.log( reader.result);
      
    //};
   // reader.readAsDataURL(file)
  
    const fileListAsArray = Array.from(e);
    fileListAsArray.forEach((item, i) => {
      const file = (e as HTMLInputElement);
      const url = URL.createObjectURL(file[i]);
      console.log(url);
      
      this.imgArr.push(url);
      console.log(item);
      
      this.fileArr.push({ item, url: url });
    });
    this.fileArr.forEach((item) => {
      this.fileObj.push(item.item)
      //console.log(this.fileObj,'fileobj')
    })
    this.comments.patchValue({
      fileSource: this.fileObj
    })
    this.comments.get('fileSource').updateValueAndValidity();

  }
  download(value: any) {
   // console.log(value);
    // this.bugservice.downloadFile(value).subscribe((res: any) => {
    //   console.log(res);
      
    // });
  }
  // Clean Url
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  updateBugStatus() {
    this.bugservice.updateBugStatus(this.f.bugstatus.value, this.bugDetails_id).subscribe((res: any) => {
      console.log(res);
    })
  }

  onSelect(event) {
   this.files.push(...event.addedFiles);
   this.comments.patchValue({
    fileSource: this.files
   })
 
 
 
  //console.log(event.addedFiles.length,'length');
   
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  showFilterBox() { }

  resetFilter() { }

  get f() {
    return this.comments.controls;
  }
}
