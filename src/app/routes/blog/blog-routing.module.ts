import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogCardComponent } from 'src/app/components/blog/blog-card/blog-card.component';
import { BlogBodyComponent } from 'src/app/components/blog/blog-body/blog-body.component';

const routes: Routes = [
  { path: '', component:BlogCardComponent},
  { path:':id', component:BlogBodyComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
