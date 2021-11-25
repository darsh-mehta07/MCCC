import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderWithLogoComponent } from './header-with-logo.component';

describe('HeaderWithLogoComponent', () => {
  let component: HeaderWithLogoComponent;
  let fixture: ComponentFixture<HeaderWithLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderWithLogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderWithLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
