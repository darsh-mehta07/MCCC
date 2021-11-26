import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFirstStepComponent } from './profile-first-step.component';

describe('ProfileFirstStepComponent', () => {
  let component: ProfileFirstStepComponent;
  let fixture: ComponentFixture<ProfileFirstStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileFirstStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileFirstStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
