import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NotFoundComponent } from './layout/not-found/not-found.component';
import { EvenementComponent } from '../features/events/evenement/evenement.component';
import { AuthComponent } from '../features/users/auth/auth.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: 'not-found-page', component: NotFoundComponent },
  {
    path: 'evenement',
    loadChildren: () => import('../features/events/events.module').then(m => m.EventsModule)
  },
  {
    path: 'users',
    loadChildren: () => import('../features/users/users.module').then(m => m.UsersModule)
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
