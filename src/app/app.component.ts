import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductsComponent } from './products/products.component';


let importList = [ProductsComponent, RouterOutlet]

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
