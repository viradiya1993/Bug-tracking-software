import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugtypesComponent } from './bugtypes.component';

describe('BugtypesComponent', () => {
  let component: BugtypesComponent;
  let fixture: ComponentFixture<BugtypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BugtypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BugtypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
