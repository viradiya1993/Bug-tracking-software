import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search-textbox',
  templateUrl: './search-textbox.component.html',
  styleUrls: ['./search-textbox.component.css']
})
export class SearchTextboxComponent implements OnInit {
  @Output() searchEvent = new EventEmitter<any>();
  @Output() resetIndex = new EventEmitter<any>();

  searchValue: any = '';
  constructor() { }

  ngOnInit(): void { }

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
