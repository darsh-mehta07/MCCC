import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventApplyComponent } from './event-apply.component';

describe('EventApplyComponent', () => {
  let component: EventApplyComponent;
  let fixture: ComponentFixture<EventApplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventApplyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
