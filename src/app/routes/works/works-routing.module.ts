import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ObrasComponent } from 'src/app/components/body/obras/obras.component';

const routes: Routes = [
  { path: ':id', component: ObrasComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorksRoutingModule { }
