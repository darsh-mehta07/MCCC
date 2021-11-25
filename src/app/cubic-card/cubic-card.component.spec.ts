import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CubicCardComponent } from './cubic-card.component';

describe('CubicCardComponent', () => {
  let component: CubicCardComponent;
  let fixture: ComponentFixture<CubicCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CubicCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CubicCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
