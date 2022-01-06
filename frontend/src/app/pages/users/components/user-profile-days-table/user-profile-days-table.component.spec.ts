import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileDaysTableComponent } from './user-profile-days-table.component';

describe('UserProfileDaysTableComponent', () => {
  let component: UserProfileDaysTableComponent;
  let fixture: ComponentFixture<UserProfileDaysTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfileDaysTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileDaysTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
