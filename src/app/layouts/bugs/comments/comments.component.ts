import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  images = [];
  imagePreview: string;
  bugStatus: any = [];
  commets: any = [];
  taskForm: FormGroup;
  bugDetails_id: any
  bugTitle: any;
  @ViewChild("ckeditor") ckeditor: any;
  constructor(  
    public sharedService: SharedService, 
    private _formBuilder: FormBuilder,
    public bugservice: BugsService,
    private route: ActivatedRoute) 
    {
      this.bugDetails_id = this.route.snapshot.paramMap.get('id');
      this.bugTitle = localStorage.getItem('bugTitle') 
    }
  ngOnInit(): void {
    this.taskForm = this._formBuilder.group({
      bugstatus: ['', Validators.required],
      task_description: [''],
      //file: ['', Validators.required],
      //fileSource: ['', Validators.required]
      fileSource: ['', [Validators.required], [mimeType]]
    })
    this.getBugstatus();
    this.getComments();
    
  }

   //Get Bug Status
  getBugstatus() {
    this.bugservice.getBugstatus().subscribe((res: any) => {
      this.bugStatus = res.data
    });
  }

  uploadFiles(event: any) {
    const files: FileList = event.target.files;
   // console.log(files);
    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      this.taskForm.patchValue({
        fileSource: element
      });
      this.taskForm.get('fileSource').updateValueAndValidity();
      // const reader = new FileReader();
      // reader.onload = () => {
      //   console.log(reader.result as string,'render');
      // };
    }
  }

  getComments() {
    this.bugservice.getComments().subscribe((res: any) => {
      console.log(res);
      if (res) {
        this.commets = res.data;
      }
    });
  }

  

  onSave() {
    const formData = new FormData();
    formData.append('bug_status', this.f.bugstatus.value);
    formData.append('task_description', this.f.task_description.value);
    formData.append('bug_details', this.bugDetails_id);
    formData.append('image', this.f.fileSource.value);
  //  this.f.fileSource.value.forEach((item, i) => {
  //   formData.append(`image ${i}`,  this.f.fileSource.value[i]);
  //  })
    
   // console.log(this.f.fileSource.value,'data');
    
 // return;
    if (!this.loader) {
      this.loader = true
      this.bugservice.addComments(formData).subscribe((res: any) => {
        if (res) {
          this.loader = false;
          this.ckeditor.instance.setData('');
          this.taskForm.reset();
          this.getComments();
          this.sharedService.loggerSuccess(res.message);
        }
      }, err => {
        this.loader = false
        this.sharedService.loggerError(err.error.message);
      });
    }
  }

  singleUpload(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.taskForm.patchValue({
      fileSource: file
    });
    this.taskForm.get('fileSource').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = (reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  multipleUpload(event: any) {
    let imageArray = []
    if (this.images.length == 5) {
      return this.sharedService.loggerError('Maximum 5 images are allowed');
    }
    const files: FileList = event.target.files;
    let count = 0;
    
    for (var i = 0; i < files.length; i++) {
      const element = files[i];
      console.log(element,'element');
      imageArray.push(element)
      this.taskForm.get('fileSource').updateValueAndValidity();
      var reader = new FileReader();
      reader.onload = (event: any) => {
        count++;
        if (this.images.length < 5) {
          this.images.push(event.target.result);
        }
        if (count == 6) {
          this.sharedService.loggerError('Maximum 5 images are allowed');
        }
      }
      reader.readAsDataURL(event.target.files[i]);
    }
    this.taskForm.patchValue({
      fileSource: imageArray
    });
  
  }

  showFilterBox() {}

  resetFilter() {}

  get f() {
    return this.taskForm.controls;
  }
}
