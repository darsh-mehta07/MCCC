import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtsInnerComponent } from './bts-inner.component';

describe('BtsInnerComponent', () => {
  let component: BtsInnerComponent;
  let fixture: ComponentFixture<BtsInnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtsInnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtsInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
