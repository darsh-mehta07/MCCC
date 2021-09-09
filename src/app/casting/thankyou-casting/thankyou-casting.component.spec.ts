import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThankyouCastingComponent } from './thankyou-casting.component';

describe('ThankyouCastingComponent', () => {
  let component: ThankyouCastingComponent;
  let fixture: ComponentFixture<ThankyouCastingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThankyouCastingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThankyouCastingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
