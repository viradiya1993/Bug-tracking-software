import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConst } from 'app/app.constant';
import { SharedService } from 'app/shared/shared.service';
import { LayoutService } from '../layout.service';
import { BugsService } from './bugs.service';
import { ViewBugsComponent } from './view-bugs/view-bugs.component';

@Component({
  selector: 'app-bugs',
  templateUrl: './bugs.component.html',
  styleUrls: ['./bugs.component.css']
})
export class BugsComponent implements OnInit {
  searchKey: any = null;
  page: any = 0;
  limit: number = AppConst.pageSize;
  length: any;
  dataSource: any;
  send: string = "Bug";
  sortName: String = 'no';
  sortType: String = 'desc';
  index: number;
  project_id: any;
  projects: any = [];
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['no', 'title', 'project_name', 'devloper', 'bug_status', 'bug_type', 'bug_priority', 'bug_description', 'action'];
  constructor( 
    private route: ActivatedRoute, 
    public bugservice: BugsService,
    public sharedService: SharedService,
    public layoutsService: LayoutService,
    private router: Router,
    public dialog: MatDialog)
     {
      this.sharedService.showLoader()
      this.project_id = this.route.snapshot.paramMap.get('id');
      console.log(this.project_id,'project id');
     }

  ngOnInit(): void {
    this.getProject();
    this.getBugList();
  }

  getBugList() {
    this.bugservice.getBugsList(this.limit, this.page, this.sortName, this.sortType, this.searchKey, this.project_id)
    .subscribe((res: any) => {
      this.sharedService.hideLoader();
      for (let index = 0; index < res.data.bugsList.length; index++) {
        let devloper = [];
        const devElement = res.data.bugsList[index].employee_id;

        for (let i = 0; i < devElement.length; i++) {
          const element = devElement[i];
          devloper.push(element.first_name);
        }
        res.data.bugsList[index].employee_id = devloper.join(',');
      }
      this.dataSource = new MatTableDataSource(res.data.bugsList);
      this.length = res.data.totalcount
    }, err => {
      this.sharedService.loggerError(err.error.message);
      this.sharedService.hideLoader();
    });
  }

  //Get project
  getProject() {
    this.layoutsService.getProject().subscribe((res: any) => {
      if (res) {
        this.projects = res.data;
      }
    });
  }

   /**
  * for pagination
  * // TODO: receiveMessage
  * @param event
  */
  receiveMessage(event: any) {
    this.limit = event.pageSize;
    this.page = event.pageIndex;
    this.getBugList();
  }

  /**
* for serching table
* // TODO: receiveSearchValue
* @returns list of project related to search
*/
  receiveSearchValue(searchKey: any) {
    if (this.searchKey !== searchKey) {
      this.searchKey = searchKey;
      this.limit = AppConst.pageSize;
      this.page = 0;
      this.getBugList();
    }
  }

  /**
  * for shorting table value
 * // TODO: sortItem
 * @param sortItem
 * @returns asc , desc
 */
  sortItem(sortItem) {
    this.sortName = sortItem;
    if (this.sortType === 'desc') {
      this.sortType = 'asc';
    } else if (this.sortType === 'asc') {
      this.sortType = 'desc';
    }
    this.getBugList();
  }

  /**
   * for search after page goto 1
  * // TODO: resetIndex
  * @param event
  */
  resetIndex(e) {
    this.index = e;
  }
  
  resetFilter() {
    this.page = 0;
    this.index = 0;
    this.getBugList();
  }

  /**
  * for popup detail
  * // TODO: viewDetail
  * @param id
  * @returns detail with perticular id
  */
  viewDetail(viewData: any) {
    const dialogRef = this.dialog.open(ViewBugsComponent, {
      width: '650px',
      data: { viewDetail: viewData }
    });
  }
}
