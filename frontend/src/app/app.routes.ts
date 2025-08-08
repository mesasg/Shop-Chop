import { Routes } from '@angular/router';
import { Register } from './register/register';
import { LogIn } from './log-in/log-in';
import { Cart } from './cart/cart';

export const routes: Routes = [
    { path: 'log-in', component: LogIn },
    { path: 'register', component: Register},
    { path: 'cart', component: Cart},
];
