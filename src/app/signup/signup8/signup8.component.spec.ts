import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Signup8Component } from './signup8.component';

describe('Signup8Component', () => {
  let component: Signup8Component;
  let fixture: ComponentFixture<Signup8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Signup8Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Signup8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
