import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyCastingComponent } from './apply-casting.component';

describe('ApplyCastingComponent', () => {
  let component: ApplyCastingComponent;
  let fixture: ComponentFixture<ApplyCastingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplyCastingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyCastingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
