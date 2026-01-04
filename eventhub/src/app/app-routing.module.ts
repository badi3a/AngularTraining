import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './layout/home/home.component';
import {ListTicketComponent} from './features/tickets/list-ticket/list-ticket.component';
import {NotFoundComponent} from './layout/not-found/not-found.component';
import {ListEventComponent} from './features/events/list-event/list-event.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'home',redirectTo:'', pathMatch:'full'},
  { path: 'events', loadChildren: () => import('./features/events/events.module').then(m => m.EventsModule) },
  { path: 'tickets', loadChildren: () => import('./features/tickets/tickets.module').then(m => m.TicketsModule) },
  { path: 'users', loadChildren: () => import('./features/users/users.module').then(m => m.UsersModule) },
  { path: 'feedbacks', loadChildren: () => import('./features/feedbacks/feedbacks.module').then(m => m.FeedbacksModule) },
  {path:'**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
