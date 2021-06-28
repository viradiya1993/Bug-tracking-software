import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConst } from 'app/app.constant';
import { DeleteBoxComponent } from 'app/shared/delete-box/delete-box.component';
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
  employee_id: any;
  bug_status: any;
  bug_type: any;
  bug_priority: any;
  projects: any = [];
  employeeArray: any = []
  employees: any = [];
  bugStatus: any = [];
  bugsType: any = [];
  bugsPriority: any = [];
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
    this.getBugstatus();
    this.getBugsType();
    this.getBugsPriority();
    this.layoutsService.getRolesData().subscribe((res: any) => {
      this.employeeArray = res.userRoles.filter(x => x.role === 'Developer');
      this.getEmployee();
    })
  }

  getBugList() {
    this.bugservice.getBugsList(
      this.limit,
      this.page,
      this.sortName,
      this.sortType,
      this.searchKey,
      this.employee_id,
      this.project_id,
      this.bug_status,
      this.bug_type,
      this.bug_priority)
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

  //selectProject
  selectProject(data: any) {
    this.project_id = data?._id;
    this.getBugList()
  }
  //Get project
  getProject() {
    this.layoutsService.getProject().subscribe((res: any) => {
      if (res) {
        this.projects = res.data;
      }
    });
  }

  //select Developer
  selectDeveloper(data: any) {
    this.employee_id = data?._id;
    this.getBugList();
  }
   //Get Employee
  getEmployee() {
  let data = {
    roleId: this.employeeArray[0]._id
  }
  this.layoutsService.getEmployee(data).subscribe((res: any) => {
    if (res.employeeLists) {
      this.employees = res.employeeLists;
    }
  });

  }

  //select BugStatus
  selectBugStatus(data: any) {
    this.bug_status = data?._id;
    this.getBugList();
  }

  //Get Bug Status
  getBugstatus() {
    this.bugservice.getBugstatus().subscribe((res: any) => {
      this.bugStatus = res.data
    });
  }

  //select BugType
  selectBugType(data: any) {
    this.bug_type = data?._id;
    this.getBugList();
  }
  //Get Bug Type
  getBugsType() {
    this.bugservice.getBugsType().subscribe((res: any) => {
      this.bugsType = res.data;
    });
  }

  //select BugPriority
  selectBugPriority(data: any) {
    this.bug_priority = data?._id;
    this.getBugList();
  }

   //Get Bug Priority
  getBugsPriority() {
    this.bugservice.getBugsPriority().subscribe((res: any) => {
      this.bugsPriority = res.data;
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
    this.project_id = '';
    this.employee_id = '';
    this.bug_status= '';
    this.bug_type = '';
    this.bug_priority = '';
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

  openDialog(id: any): void {
    const dialogRef = this.dialog.open(DeleteBoxComponent, {
      width: '350px',
      data: AppConst.bugdetailsDeleteMessage
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bugservice.deleteBugDetails(id).subscribe((res: any) => {
          this.getBugList();
          this.sharedService.loggerSuccess(res.message);
        })
      }
    }, err => {
      this.sharedService.loggerError(err.message);
    });
  }
}
