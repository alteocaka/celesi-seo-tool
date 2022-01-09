import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaysCheckinComponent } from './days-checkin.component';

describe('DaysCheckinComponent', () => {
  let component: DaysCheckinComponent;
  let fixture: ComponentFixture<DaysCheckinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DaysCheckinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DaysCheckinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
