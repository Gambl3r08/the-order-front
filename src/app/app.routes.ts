
import { Routes } from '@angular/router';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';


export const routes: Routes = [
    { path: 'product-form', component: ProductFormComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'orders', component: OrdersComponent },
];
    