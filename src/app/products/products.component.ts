import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../products/product.service';
import { Product } from '../products/product.model';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = []; // Asegúrate de que esto sea un array
  private productCreatedSubscription: Subscription | undefined;
  
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (products) => this.products = products,
      error: (err) => console.error('Error fetching products', err)
    });
    
    this.productCreatedSubscription = this.productService.productCreated$.subscribe(() => {
    this.productService.getProducts().subscribe({
        next: (products) => this.products = products,
        error: (err) => console.error('Error fetching products', err)
      });
  });
  }
  ngOnDestroy(): void {
    if (this.productCreatedSubscription) {
      this.productCreatedSubscription.unsubscribe();
    }
  }
}
