import { Routes } from '@angular/router';
import { Register } from './register/register';
import { LogIn } from './log-in/log-in';
import { Cart } from './cart/cart';
import { Profile } from './profile/profile';
import { Order } from './order/order';

export const routes: Routes = [
    { path: 'log-in', component: LogIn },
    { path: 'register', component: Register},
    { path: 'cart', component: Cart},
    { path: 'profile', component: Profile},
    { path: 'order', component: Order},
];
