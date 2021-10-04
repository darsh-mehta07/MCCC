import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutMcccComponent } from './about-mccc.component';

describe('AboutMcccComponent', () => {
  let component: AboutMcccComponent;
  let fixture: ComponentFixture<AboutMcccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutMcccComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutMcccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
