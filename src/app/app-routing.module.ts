import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { ObrasComponent } from './components/body/obras/obras.component';
import { BodyComponent } from './components/body/body.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

const routes: Routes = [
  { path: '', component: BodyComponent},
  { path: 'obras/:url', component: ObrasComponent,
  loadChildren: ()=> import('./routes/works/works.module').then(m => m.WorksModule)},
  { path: "**", component: NotfoundComponent}
];

const routesExtra: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
}

@NgModule({
  imports: [RouterModule.forRoot(routes, routesExtra)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
