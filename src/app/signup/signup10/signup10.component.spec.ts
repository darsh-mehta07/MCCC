import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Signup10Component } from './signup10.component';

describe('Signup10Component', () => {
  let component: Signup10Component;
  let fixture: ComponentFixture<Signup10Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Signup10Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Signup10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
