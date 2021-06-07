import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTechnologyComponent } from './edit-technology.component';

describe('EditTechnologyComponent', () => {
  let component: EditTechnologyComponent;
  let fixture: ComponentFixture<EditTechnologyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTechnologyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTechnologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
