import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { YouTubePlayerModule } from '@angular/youtube-player';

import { WorksRoutingModule } from './works-routing.module';
import { ObrasComponent } from 'src/app/components/body/obras/obras.component';
import { ShareModule } from 'src/app/share/share.module';

@NgModule({
  declarations: [ObrasComponent],
  imports: [
    CommonModule,
    ShareModule,
    RouterModule,
    YouTubePlayerModule,
    WorksRoutingModule
  ]
})
export class WorksModule { }
