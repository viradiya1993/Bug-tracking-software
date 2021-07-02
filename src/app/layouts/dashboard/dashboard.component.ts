import { Component, OnInit } from '@angular/core';
import { SharedService } from 'app/shared/shared.service';
import * as Chartist from 'chartist';
import { LayoutService } from '../layout.service';
import { ProjectService } from '../project/project.service';
import { DashboardService } from './dashboard.service';

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
  employeeData: any
  projectsAssing: any;
  projectsActive: any;
  constructor(public sharedService: SharedService, 
              public dashborad: DashboardService, 
              public projectService: ProjectService, 
              private layoutService: LayoutService) { this.sharedService.showLoader(); }

  startAnimationForLineChart(chart){
      let seq: any, delays: any, durations: any;
      seq = 0;
      delays = 80;
      durations = 500;

      chart.on('draw', function(data) {
        if(data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if(data.type === 'point') {
              seq++;
              data.element.animate({
                opacity: {
                  begin: seq * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: 'ease'
                }
              });
          }
      });

      seq = 0;
  };
  startAnimationForBarChart(chart){
      let seq2: any, delays2: any, durations2: any;

      seq2 = 0;
      delays2 = 80;
      durations2 = 500;
      chart.on('draw', function(data) {
        if(data.type === 'bar'){
            seq2++;
            data.element.animate({
              opacity: {
                begin: seq2 * delays2,
                dur: durations2,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
      });

      seq2 = 0;
  };
  ngOnInit() {
      /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

      const dataDailySalesChart: any = {
          labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
          series: [
              [12, 17, 7, 17, 23, 18, 38]
          ]
      };

     const optionsDailySalesChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
      }

      var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

      this.startAnimationForLineChart(dailySalesChart);


      /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

      const dataCompletedTasksChart: any = {
          labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
          series: [
              [230, 750, 450, 300, 280, 240, 200, 190]
          ]
      };

     const optionsCompletedTasksChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0}
      }

      var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

      // start animation for the Completed Tasks Chart - Line Chart
      this.startAnimationForLineChart(completedTasksChart);



      /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

      var datawebsiteViewsChart = {
        labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
        series: [
          [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

        ]
      };
      var optionswebsiteViewsChart = {
          axisX: {
              showGrid: false
          },
          low: 0,
          high: 1000,
          chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
      };
      var responsiveOptions: any[] = [
        ['screen and (max-width: 640px)', {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }]
      ];
      var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

      //start animation for the Emails Subscription Chart
      this.startAnimationForBarChart(websiteViewsChart);
      this.projectService.getProjectStatus().subscribe((res: any) => {
       this.statusOpen =  res.status.filter(x => x.value === 'Open');
       this.statusProgress = res.status.filter(x => x.value === 'In Progress')
       this.getProjectCount();
       this.getActiveProject();
      });

      this.layoutService.getEmpStatus().subscribe((res: any) => {
        this.activeEmployee = res.status.filter(x => x.status === 'Active')
        this.getActiveEmployee();
      })
      this.getAssignProject();
     
  }

  getProjectCount() {
    let data = {
      statusOpen: this.statusOpen[0]._id,
      statusInPro: this.statusProgress[0]._id
    }
    this.dashborad.getProjectCount(data).subscribe((res: any) => {
      this.sharedService.hideLoader();
      this.projectData = res.data;
    });
  }

  getActiveEmployee() {
    let data = {
      status: this.activeEmployee[0]._id
    }
    this.dashborad.getActiveEmpCount(data).subscribe((res: any) => {
      this.sharedService.hideLoader();
      this.employeeData = res.data
    });
  }

  getAssignProject() {
    this.dashborad.getAssignProject().subscribe((res: any) => {
      this.sharedService.hideLoader();
      this.projectsAssing = res.data;
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
}

