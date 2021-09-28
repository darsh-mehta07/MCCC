import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventComponent } from './event/event.component';
import { EventInnerComponent } from'./event-inner/event-inner.component';
import { EventApplyComponent } from './event-apply/event-apply.component';
import { EventThankyouComponent } from './event-thankyou/event-thankyou.component';

const routes: Routes = [
  {    
    path: 'event',component: EventComponent,    
    data: {storeRoute: true,title: 'Event Page'}    
  }, 
  {    
    path: 'event-inner',component: EventInnerComponent,    
    data: {storeRoute: true,title: 'Event Inner Page'}    
  },
  {    
    path: 'event-apply',component: EventApplyComponent,    
    data: {storeRoute: true,title: 'Event Apply Page'}    
  },
  {    
    path: 'event-thankyou',component: EventThankyouComponent,    
    data: {title: 'Thankyou Page'}    
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
