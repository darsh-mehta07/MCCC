import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCastingInnerComponent } from './my-casting-inner.component';

describe('MyCastingInnerComponent', () => {
  let component: MyCastingInnerComponent;
  let fixture: ComponentFixture<MyCastingInnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyCastingInnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCastingInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
