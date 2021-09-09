import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Signup6Component } from './signup6.component';

describe('Signup6Component', () => {
  let component: Signup6Component;
  let fixture: ComponentFixture<Signup6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Signup6Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Signup6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
