import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './layout/home/home.component';
import {NotFoundComponent} from './layout/not-found/not-found.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path:'home', redirectTo:'', pathMatch:'full'},
  {path: 'events', loadChildren: () => import('./features/events/events.module').then(m => m.EventsModule) },
  {path:'**', component: NotFoundComponent},

];

@NgModule({ 
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
