import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as Highcharts from 'angular-highcharts';
import { Label } from 'ng2-charts';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit, OnChanges{

  constructor() { }
 
  
 
  @Input() chartData: Subject<any>;;
  @Input() chartLabels: Label[];
  pieChart: any;
  pieData: any[] = [];
  public pieChartLabels: Label[];
  public pieChartData: any[] = [];

  ngOnInit(): void {
    this.pieChartLabels = this.chartLabels;
    
    for (var l in this.pieChartLabels) {
        this.pieData.push({
          name: this.pieChartLabels[l]
        })
    }
     
    // this.chartData.subscribe(value => {
    //   this.pieChartData = value;
    //   for (var l in this.pieChartLabels) {
    //     for (var d in this.pieChartData) {
    //       if(l == d){
    //         this.pieData.push({
    //           name: this.pieChartLabels[l],
    //           y: +this.pieChartData[d]
    //         })
    //         break;
    //       }
    //     }
    //   }
    // })
    this.initPieChart();
  }

  ngOnChanges(): void {
    // console.log(this.chartData);
    
  }

  initPieChart() {
   
    const chart = new Highcharts.Chart({
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false,
      },
      title: {
        text: null
      },
      tooltip: {
        pointFormat: '<b>: &nbsp; {point.y} |&nbsp; {point.percentage:.0f}%</b>'
        // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
          },
          startAngle: 90,
        },
      },
      legend: {
        align: 'right',
        verticalAlign: 'middle',
        shadow: false
      },
      series: [
        {
          type: 'pie',
          data: this.pieData,
          showInLegend: true,
          dataLabels: {
            enabled: false
          },

        }],
        responsive:{
          rules:[{
            condition: {
              maxWidth: 300
            },
            chartOptions: {
              legend: {
                align: 'center',
                verticalAlign: 'bottom',
                borderRadius: 1,
                width: 290,
                itemWidth:145,
                // itemStyle:{
                //   fontSize:'10px'
                // }
              },
            }
          }]
        }
    })
    this.pieChart = chart;

  }
}
