import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { LayoutService } from 'app/layouts/layout.service';
import { Technology } from 'app/model/technology.model';
import { SharedService } from 'app/shared/shared.service';
import { TechnologyService } from '../technology.service';

@Component({
  selector: 'app-edit-technology',
  templateUrl: './edit-technology.component.html',
  styleUrls: ['./edit-technology.component.css']
})
export class EditTechnologyComponent implements OnInit {
  technologyId: any;
  technology = new Technology();
  loader = false;
  @ViewChild(NgForm) myForm: NgForm;
  constructor(private service: TechnologyService, public sharedService: SharedService,
    public route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
       if(paramMap.has('id')) {
         this.technologyId = paramMap.get('id');
         this.sharedService.showLoader(); 
         this.service.geTechnologyDetail(this.technologyId).subscribe((res: any) => {
          this.sharedService.hideLoader();
          this.technology = res.data.technology
         }, err => {
           this.sharedService.loggerError(err.message);
         });
       }
    })
  }
 
  //Update Technology
  onSave(form: NgForm) {
    if (form.invalid) {
      return
    }
    const data = {
      tech_name: form.value.tech_name,
    }
    if(!this.loader) { 
      this.loader = true;
      this.service.updateTechnology(data, this.technologyId).subscribe((res: any) => {
        this.loader = false;
        this.sharedService.loggerSuccess(res.message);
        this.myForm.reset();
        this.router.navigate(['/technology']);
      }, err => {
        this.loader = false;
        this.sharedService.loggerError(err.error.message);
      });
    }
  }

   //cancel
   onCancel() {
    this.router.navigate(['/technology']);
  }
}
