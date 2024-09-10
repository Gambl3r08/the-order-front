import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductFormComponent } from "./product-form/product-form.component";
import { OrdersComponent } from "./orders/orders.component";



let importList = [
  ProductsComponent,
  RouterOutlet,
  ReactiveFormsModule,
  ProductFormComponent,
  OrdersComponent
]

@Component({
  selector: 'app-root',
  standalone: true,
  imports: importList,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'the_order_front';
}
