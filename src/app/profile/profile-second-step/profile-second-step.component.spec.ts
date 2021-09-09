import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSecondStepComponent } from './profile-second-step.component';

describe('ProfileSecondStepComponent', () => {
  let component: ProfileSecondStepComponent;
  let fixture: ComponentFixture<ProfileSecondStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileSecondStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSecondStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
