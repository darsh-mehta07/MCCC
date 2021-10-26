import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventInnerComponent } from './event-inner.component';

describe('EventInnerComponent', () => {
  let component: EventInnerComponent;
  let fixture: ComponentFixture<EventInnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventInnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
