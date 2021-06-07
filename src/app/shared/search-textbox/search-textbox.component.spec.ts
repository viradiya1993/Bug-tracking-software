import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTextboxComponent } from './search-textbox.component';

describe('SearchTextboxComponent', () => {
  let component: SearchTextboxComponent;
  let fixture: ComponentFixture<SearchTextboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchTextboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTextboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
