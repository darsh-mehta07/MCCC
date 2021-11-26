import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Signup7Component } from './signup7.component';

describe('Signup7Component', () => {
  let component: Signup7Component;
  let fixture: ComponentFixture<Signup7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Signup7Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Signup7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
