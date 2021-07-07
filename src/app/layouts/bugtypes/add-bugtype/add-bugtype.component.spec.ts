import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBugtypeComponent } from './add-bugtype.component';

describe('AddBugtypeComponent', () => {
  let component: AddBugtypeComponent;
  let fixture: ComponentFixture<AddBugtypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBugtypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBugtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
