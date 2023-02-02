import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorksRoutingModule } from './works-routing.module';
import { ObrasComponent } from 'src/app/components/body/obras/obras.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [ObrasComponent],
  imports: [
    CommonModule,
    RouterModule,
    WorksRoutingModule
  ]
})
export class WorksModule { }
