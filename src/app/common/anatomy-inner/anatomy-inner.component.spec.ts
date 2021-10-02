import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnatomyInnerComponent } from './anatomy-inner.component';

describe('AnatomyInnerComponent', () => {
  let component: AnatomyInnerComponent;
  let fixture: ComponentFixture<AnatomyInnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnatomyInnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnatomyInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
