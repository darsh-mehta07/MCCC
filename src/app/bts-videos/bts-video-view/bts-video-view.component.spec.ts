import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtsVideoViewComponent } from './bts-video-view.component';

describe('BtsVideoViewComponent', () => {
  let component: BtsVideoViewComponent;
  let fixture: ComponentFixture<BtsVideoViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtsVideoViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtsVideoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


