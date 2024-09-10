import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../products/product.service';
import { Product } from '../products/product.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  constructor(private fb: FormBuilder,
    private productService: ProductService) {
    this.productForm =this.fb.group({
      product_name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      description: ['']
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if(this.productForm.valid) {
      const product: Product = this.productForm.value;
      this.productService.createProduct(product).subscribe({
        next: (product) => console.log('Product created', product),
        error: (err) => console.error('Error creating product', err)
      });
    }
  }
}
