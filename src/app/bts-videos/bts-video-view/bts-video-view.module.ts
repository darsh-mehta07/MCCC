import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { SafePipe } from '../../_config/safe.pipe';

@NgModule({
    imports: [
        SafePipe,      
    ],
    declarations: [SafePipe]
  })export class BtsVideoViewModule {}