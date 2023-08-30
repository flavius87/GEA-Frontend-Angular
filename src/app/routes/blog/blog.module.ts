import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';

import { BlogCardComponent } from 'src/app/components/blog/blog-card/blog-card.component';
import { BlogBodyComponent } from 'src/app/components/blog/blog-body/blog-body.component';
import { HeadComponent } from 'src/app/components//blog/head/head.component';
import { ShareModule } from 'src/app/share/share.module';
import { BlogService } from 'src/app/services/blog.service';
import { ToHtmlPipe  } from 'src/app/pipes/to-html.pipe';



@NgModule({
  declarations: [
    BlogCardComponent,
    BlogBodyComponent,
    HeadComponent,
    ToHtmlPipe],
  imports: [
    CommonModule,
    ShareModule,
    BlogRoutingModule
  ],
  providers: [BlogService],
})
export class BlogModule { }
