import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFinalStepComponent } from './profile-final-step.component';

describe('ProfileFinalStepComponent', () => {
  let component: ProfileFinalStepComponent;
  let fixture: ComponentFixture<ProfileFinalStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileFinalStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileFinalStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
