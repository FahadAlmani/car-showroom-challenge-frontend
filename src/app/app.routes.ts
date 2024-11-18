import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: 'car-showroom-management',
    loadComponent: () =>
      import(
        './page/car-showroom-management/car-showroom-management.component'
      ).then((c) => c.CarShowroomManagementComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'car-showroom-details/:id',
    loadComponent: () =>
      import('./page/car-showroom-details/car-showroom-details.component').then(
        (c) => c.CarShowroomDetailsComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./page/login/login.component').then((c) => c.LoginComponent),
  },
  { path: '', redirectTo: '/car-showroom-management', pathMatch: 'full' },
  { path: '**', redirectTo: '/car-showroom-management' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
