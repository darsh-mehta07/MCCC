import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventRoutingModule } from './event-routing.module';
import { EventComponent } from './event/event.component';
import { EventInnerComponent } from './event-inner/event-inner.component';
import { EventApplyComponent } from './event-apply/event-apply.component';
import { EventThankyouComponent } from './event-thankyou/event-thankyou.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';


@NgModule({
  exports: [HeaderComponent,FooterComponent],
  declarations: [
    EventComponent,
    EventInnerComponent,
    EventApplyComponent,
    EventThankyouComponent,
    HeaderComponent,
    FooterComponent
  ],
  
  imports: [
    CommonModule,
    EventRoutingModule
  ]
})
export class EventModule { }
