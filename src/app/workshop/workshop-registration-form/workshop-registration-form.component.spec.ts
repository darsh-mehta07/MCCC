import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopRegistrationFormComponent } from './workshop-registration-form.component';

describe('WorkshopRegistrationFormComponent', () => {
  let component: WorkshopRegistrationFormComponent;
  let fixture: ComponentFixture<WorkshopRegistrationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkshopRegistrationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopRegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
