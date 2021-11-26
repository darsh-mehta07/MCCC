import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CastingAllComponent } from './casting-all.component';

describe('CastingAllComponent', () => {
  let component: CastingAllComponent;
  let fixture: ComponentFixture<CastingAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CastingAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CastingAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
