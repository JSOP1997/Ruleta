import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'lottery',
        loadComponent: () => import('./module/lottery/lottery.component').then( c => c.LotteryComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./module/register/register.component').then( c => c.RegisterComponent)
    },
    {
        path: 'new-register',
        loadComponent: () => import('./module/new-user/new-user.component').then( c => c.NewUserComponent)
    },
    {
        path: '**',
        redirectTo: '/register'
    },
];
