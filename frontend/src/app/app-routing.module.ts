import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './layout/main/main.component';
import { RestrictedComponent } from './shared/components/restricted-layout/restricted.component';
import { UserDetailsComponent } from './pages/users/containers/user-details/user-details.component';
import { NonAuthGuard } from './core/auth/non-auth.guard';
import { AuthGuard } from './core/auth/auth.guard';
import { AdminGuard } from './core/auth/admin.guard';

const routes: Routes = [
  {
    path: 'login',
    // component: LoginLayoutComponent,
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
    canActivate: [NonAuthGuard],
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/days-checkin/days-checkin.module').then(m => m.DaysCheckinModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'user-details/:userId',
        component: UserDetailsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'restricted',
        component: RestrictedComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'users',
        loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule),
        canActivate: [AuthGuard]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
