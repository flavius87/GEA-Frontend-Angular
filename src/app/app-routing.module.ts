import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { BodyComponent } from './components/body/body.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

const routes: Routes = [
  { path: '', component: BodyComponent},
  { path: '404', component: NotfoundComponent},
  { path: 'obras',
  loadChildren: ()=> import('./routes/works/works.module').then(m => m.WorksModule)},
  { path: '**', redirectTo:'/404', pathMatch: 'full'}
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
