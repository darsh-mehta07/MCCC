import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CastingInnerComponent } from './casting-inner.component';

describe('CastingInnerComponent', () => {
  let component: CastingInnerComponent;
  let fixture: ComponentFixture<CastingInnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CastingInnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CastingInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
