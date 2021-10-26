import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationConfirmCastingComponent } from './application-confirm-casting.component';

describe('ApplicationConfirmCastingComponent', () => {
  let component: ApplicationConfirmCastingComponent;
  let fixture: ComponentFixture<ApplicationConfirmCastingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationConfirmCastingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationConfirmCastingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
