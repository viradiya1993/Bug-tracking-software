import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugstatusComponent } from './bugstatus.component';

describe('BugstatusComponent', () => {
  let component: BugstatusComponent;
  let fixture: ComponentFixture<BugstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BugstatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BugstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
