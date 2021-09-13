import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtsVideosComponent } from './bts-videos.component';

describe('BtsVideosComponent', () => {
  let component: BtsVideosComponent;
  let fixture: ComponentFixture<BtsVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtsVideosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtsVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
