import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Signup9Component } from './signup9.component';

describe('Signup9Component', () => {
  let component: Signup9Component;
  let fixture: ComponentFixture<Signup9Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Signup9Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Signup9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
