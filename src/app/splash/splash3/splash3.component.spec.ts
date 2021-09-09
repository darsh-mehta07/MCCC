import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Splash3Component } from './splash3.component';

describe('Splash3Component', () => {
  let component: Splash3Component;
  let fixture: ComponentFixture<Splash3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Splash3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Splash3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
