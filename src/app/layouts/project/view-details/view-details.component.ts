import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.css']
})
export class ViewDetailsComponent implements OnInit {
  viewContent: any;
 
  constructor(public dialogRef: MatDialogRef<ViewDetailsComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.viewContent = this.data.viewDetail
  }

  onCancle(): void {
    this.dialogRef.close();
  }
  
  
}
