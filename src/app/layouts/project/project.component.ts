import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AppConst } from 'app/app.constant';
import { DeleteBoxComponent } from 'app/shared/delete-box/delete-box.component';
import { SharedService } from 'app/shared/shared.service';
import * as moment from 'moment';
import { LayoutService } from '../layout.service';
import { ProjectService } from './project.service';
import { ViewDetailsComponent } from './view-details/view-details.component';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  searchKey: any = null;
  page: any = 0;
  limit: number = AppConst.pageSize;
  length: any;
  dataSource: any;
  sortName: String = 'project_no';
  sortType: String = 'desc';
  index: number;
  start_date: any;
  end_date: any;
  sDate: any;
  eDate: any;
  technologys: any = [];
  departments: any = [];
  projectManagerArray: any = [];
  projectManager: any = [];
  employeeArray: any = [];
  employees: any = [];
  projectStatus: any = []
  departmentId: any;
  technologyId: any;
  employee_id: any;
  manager_id: any;
  status_id: any;
  viewContent: any;

  @ViewChild(MatSort) sort: MatSort;
  send: string = "Project";
  displayedColumns: string[] = ['project_no', 'project_name', 'technology', 'department', 'project_manager', 'employee', 'status', 'project_description', 'action'];
  constructor(
    public projectService: ProjectService,
    public sharedService: SharedService,
    public layoutsService: LayoutService,
    private router: Router,
    public dialog: MatDialog,
  ) { this.sharedService.showLoader() }

  ngOnInit(): void {
    this.getProjectList();
    this.getTechnology();
    this.getDepartment();
    this.getStatus();


    this.layoutsService.getRolesData().subscribe((res: any) => {
      this.projectManagerArray = res.userRoles.filter(x => x.role === 'Project Manager');
      this.employeeArray = res.userRoles.filter(x => x.role === 'Developer');
      this.getEmployee();
      this.getProject();
    })
  }

  getProjectList() {
    this.projectService.getProjectList(this.limit, this.page, this.sortName, this.sortType, this.searchKey, this.departmentId, this.technologyId, this.employee_id, this.manager_id, this.status_id,)
      .subscribe((res: any) => {
        this.sharedService.hideLoader();
        for (let index = 0; index < res.data.projects.length; index++) {
          let techName = [];
          let empName = [];
          const techElement = res.data.projects[index].technology_id;
          const empElement = res.data.projects[index].employee_id;

          for (let i = 0; i < techElement.length; i++) {
            const techObj = techElement[i];
            techName.push(techObj.tech_name);
          }

          for (let j = 0; j < empElement.length; j++) {
            const element = empElement[j];
            empName.push(element.first_name);
          }
          res.data.projects[index].technology_id = techName.join(',');
          res.data.projects[index].employee_id = empName.join(',');

        }

        this.dataSource = new MatTableDataSource(res.data.projects);
        this.length = res.data.totalcount
      }, err => {
        this.sharedService.loggerError(err.error.message);
        this.sharedService.hideLoader();
      });
  }

  selectTech(value: any) {
    this.technologyId = value?._id;
    this.getProjectList();
  }


  //Get Technology
  getTechnology() {
    this.layoutsService.getTechnology().subscribe((res: any) => {
      this.technologys = res.data;
    });
  }


  selectDepartment(value: any) {
    this.departmentId = value?._id;
    this.getProjectList();
  }

  //Get Department
  getDepartment() {
    this.layoutsService.getDepartmentData().subscribe(res => {
      if (res.userDepartment) {
        this.departments = res.userDepartment;
      }
    });
  }

  selectEmp(value: any) {
    this.employee_id = value?._id
    this.getProjectList();
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

  selectManager(value: any) {
    this.manager_id = value?._id
    this.getProjectList();
  }

  //Get Project Manager
  getProject() {
    let data = {
      roleId: this.projectManagerArray[0]._id
    }
    this.layoutsService.getEmployee(data).subscribe((res: any) => {
      if (res.employeeLists) {
        this.projectManager = res.employeeLists;
      }
    });
  }

  //get Status
  getStatus() {
    this.projectService.getProjectStatus().subscribe((res: any) => {
      if (res.status) {
        this.projectStatus = res.status
      }
    });
  }

  //selectStatus
  selectStatus(value: any) {
    this.status_id = value?._id;
    this.getProjectList();
  }

  filterDate() {
    var sdt = moment(this.start_date);
    var edt = moment(this.end_date);
    if (sdt.isValid && edt.isValid) {
      this.sDate = sdt.format("x");
      this.eDate = edt.format("x");
      this.getProjectList();
    }

  }

  resetFilter() {
    this.start_date = '';
    this.end_date = '';
    this.sDate = '';
    this.eDate = '';
    this.page = 0;
    this.index = 0;
    this.departmentId = '';
    this.technologyId = '';
    this.employee_id = '';
    this.manager_id = '';
    this.status_id = '';
    this.getProjectList();
  }

  /**
   * for search after page goto 1
  * // TODO: resetIndex
  * @param event
  */
  resetIndex(e) {
    this.index = e;
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
      this.getProjectList();
    }
  }

  /**
  * for pagination
  * // TODO: receiveMessage
  * @param event
  */
  receiveMessage(event: any) {
    this.limit = event.pageSize;
    this.page = event.pageIndex;
    this.getProjectList();
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
    this.getProjectList();
  }

  /**
    * for popup detail
   * // TODO: viewDetail
   * @param id
   * @returns detail with perticular id
   */
  viewDetail(viewData: any) {
    const dialogRef = this.dialog.open(ViewDetailsComponent, {
      width: '650px',
      data: { viewDetail: viewData }
    });
  }

  openDialog(id: any): void {
    const dialogRef = this.dialog.open(DeleteBoxComponent, {
      width: '350px',
      data: AppConst.projectdeleteMessage
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.projectService.deleteProject(id).subscribe((res: any) => {
          this.getProjectList();
          this.sharedService.loggerSuccess(res.message);
        })
      }
    }, err => {
      this.sharedService.loggerError(err.message);
    });
  }
}
