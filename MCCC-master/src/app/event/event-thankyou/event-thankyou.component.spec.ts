import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventThankyouComponent } from './event-thankyou.component';

describe('EventThankyouComponent', () => {
  let component: EventThankyouComponent;
  let fixture: ComponentFixture<EventThankyouComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventThankyouComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventThankyouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
