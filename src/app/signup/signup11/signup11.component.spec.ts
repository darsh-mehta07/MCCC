import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Signup11Component } from './signup11.component';

describe('Signup11Component', () => {
  let component: Signup11Component;
  let fixture: ComponentFixture<Signup11Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Signup11Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Signup11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
