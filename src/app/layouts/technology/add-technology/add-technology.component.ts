import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LayoutService } from 'app/layouts/layout.service';
import { Technology } from 'app/model/technology.model';
import { SharedService } from 'app/shared/shared.service';

@Component({
  selector: 'app-add-technology',
  templateUrl: './add-technology.component.html',
  styleUrls: ['./add-technology.component.css']
})
export class AddTechnologyComponent implements OnInit {
  technology = new Technology();
  lastTechId: number;
  loader = false;
  @ViewChild(NgForm) myForm: NgForm;
  constructor(
    private layoutsService: LayoutService,
    public sharedService: SharedService,
    private router: Router
  ) { }

  ngOnInit(): void {}

  //Add Technology
  onSave(form: NgForm) {
    if (form.invalid) {
      return
    }
    const data = {
      tech_name: form.value.tech_name,
    }
    if(!this.loader) {
      this.loader = true
      this.layoutsService.addTechnology(data).subscribe((res: any) => {
        if (res) {
           this.loader = false;
           this.myForm.reset();
           this.sharedService.loggerSuccess(res.message);
           this.router.navigate(['/technology']);
         }
      }, err => {
          this.loader = false;
          this.sharedService.loggerError(err.message);
      });
    }
    
  }

  //cancel
  onCancel() {
    this.router.navigate(['/technology']);
  }
}
