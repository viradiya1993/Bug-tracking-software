import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-bugs',
  templateUrl: './view-bugs.component.html',
  styleUrls: ['./view-bugs.component.css']
})
export class ViewBugsComponent implements OnInit {
  viewContent: any;
  constructor(public dialogRef: MatDialogRef<ViewBugsComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.viewContent = this.data.viewDetail
  }

  onCancle(): void {
    this.dialogRef.close();
  }

}
