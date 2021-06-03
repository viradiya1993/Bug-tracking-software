import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppConst } from 'app/app.constant';
import { AuthService } from 'app/auth/auth.service';
import { SharedService } from 'app/shared/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-technology',
  templateUrl: './technology.component.html',
  styleUrls: ['./technology.component.css']
})
export class TechnologyComponent implements OnInit {
  searchKey: any = null;
  page: any = 0;
  limit: number = AppConst.pageSize;
  length: any;
  dataSource: any;
  sortType: String = 'desc';
  index: number;
  displayedColumns: string[] = ['no', 'technologyid', 'technology'];
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private service: LayoutService,
    private spinner: NgxSpinnerService,
    private sharedService: SharedService,
    private authService: AuthService
  ) { 

    this.getTechnology();
  }

  ngOnInit(): void {
  }

  getTechnology() {
    this.service.getTechnology(this.limit, this.page, this.sortType, this.searchKey)
    .subscribe((res: any) => {
      console.log(res.data.technology,'technology')
      this.dataSource = new MatTableDataSource(res.data.technology);
      console.log(this.dataSource)
      this.length = res.data.totalcount;
      console.log(this.length, 'length');
    })
  }

  resetFilter() {
    this.page = 0;
    this.index = 0;
    this.getTechnology();
  }
}
