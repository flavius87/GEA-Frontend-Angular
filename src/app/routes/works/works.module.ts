import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { HttpClientModule } from '@angular/common/http';

import { WorksRoutingModule } from './works-routing.module';
import { ObrasComponent } from 'src/app/components/body/obras/obras.component';
import { LoadingComponent } from 'src/app//components/loading/loading.component';

@NgModule({
  declarations: [ObrasComponent, LoadingComponent],
  imports: [
    CommonModule,
    RouterModule,
    YouTubePlayerModule,
    WorksRoutingModule,
    HttpClientModule
  ]
})
export class WorksModule { }
