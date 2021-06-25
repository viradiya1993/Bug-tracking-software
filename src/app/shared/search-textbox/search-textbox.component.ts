import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppConst } from 'app/app.constant';

@Component({
  selector: 'app-search-textbox',
  templateUrl: './search-textbox.component.html',
  styleUrls: ['./search-textbox.component.css']
})
export class SearchTextboxComponent implements OnInit {
  @Output() searchEvent = new EventEmitter<any>();
  @Output() resetIndex = new EventEmitter<any>();

  @Input() message: string;

  labelConst = AppConst.labelForTextbox;
  searchValue: any = '';

  labelText: string = '';
  constructor() {
    console.log(this.message);

  }

  ngOnInit(): void {
    this.checkLabelValue();
  }

  checkLabelValue() {
    if (this.message == 'Department') {
      this.labelText = this.labelConst.Department;
    } else if (this.message == 'Technology') {
      this.labelText = this.labelConst.Technology;
    } else if (this.message == 'Project') {
      this.labelText = this.labelConst.Project;
    } else {
      this.labelText = this.labelConst.Default;
    }
  }
  search(value: any) {
    if (value === null) {
      value = '';
    }
    this.searchEvent.emit(value);
  }

  cancel(value: any) {
    value = null;
    this.searchValue = '';
    this.searchEvent.emit(value);
    this.resetIndex.emit(0);
  }
}
