import { Component, OnInit } from '@angular/core';
import { SharedService } from 'app/shared/shared.service';
import { LayoutService } from '../layout.service';
import { ProjectService } from '../project/project.service';
import { DashboardService } from './dashboard.service';


import * as Highcharts from 'highcharts';
import { Label, SingleDataSet } from 'ng2-charts';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  statusOpen: any
  statusProgress: any;
  activeEmployee: any;
  projectData: any;
  projectsActive: any;
  projectAssignPM: any;
  userRole_id: any;
  userRole: any;
  showAdmin = false;
  showPm = false;
  showDev = false;
  public pieChartLabels: Label[] = ['Successful Request', 'Failed Request'];
  pieChartData: Subject<any> = new Subject();
  pieChartData1 = [0, 1]
  public tmpPieChartData: any[] = [];
  constructor(public sharedService: SharedService, 
              public dashborad: DashboardService, 
              public projectService: ProjectService, 
              private layoutService: LayoutService,
              public layoutsService: LayoutService) { 
                this.sharedService.showLoader();
                this.userRole_id = localStorage.getItem('roleId')
              }

  
  ngOnInit() {
      this.projectService.getProjectStatus().subscribe((res: any) => {
        this.statusOpen =  res.status.filter(x => x.value === 'Open');
        this.statusProgress = res.status.filter(x => x.value === 'In Progress')
       
        this.layoutService.getEmpStatus().subscribe((res: any) => {
          this.activeEmployee = res.status.filter(x => x.status === 'Active')
          this.getRoleData();
        })

      });
      this.tmpPieChartData = this.pieChartData1
      this.pieChartData.next(this.tmpPieChartData);
      
  }

  getProjectCount() {
    let data = {
      statusOpen: this.statusOpen[0]._id,
      statusInPro: this.statusProgress[0]._id,
      status: this.activeEmployee[0]._id
    }
    this.dashborad.getProjectCount(data).subscribe((res: any) => {
      this.sharedService.hideLoader();
      this.projectData = res.data;
    });
  }

  getAssignActiveProject() {
    let data = {
      statusOpen: this.statusOpen[0]._id,
      statusInPro: this.statusProgress[0]._id
    }
    this.dashborad.getAssignActiveProject(data).subscribe((res: any) => {
      this.sharedService.hideLoader();
      this.projectAssignPM = res.data;
    });
  }

  getActiveProject() {
    let data = {
      statusOpen: this.statusOpen[0]._id,
      statusInPro: this.statusProgress[0]._id
    }
    this.dashborad.getActiveProject(data).subscribe((res: any) => {
      this.sharedService.hideLoader();
      this.projectsActive = res.data;
    });
  }

  getRoleData() {
    this.layoutsService.getRolesData().subscribe((res: any) => {
      this.userRole = res.userRoles.filter(x => x._id === this.userRole_id);
      if (this.userRole[0].role == "SuperAdmin") {
        this.showAdmin = true
        this.getProjectCount();
      } else if (this.userRole[0].role == "Project Manager") {
        this.showPm = true
        this.getAssignActiveProject();
      } else if (this.userRole[0].role == "Developer") {
          this.showDev = true
          this.getActiveProject();
      } else {
          this.showDev = true
          this.getActiveProject();
      }

    })
  }
}

