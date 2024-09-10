import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { OrderService } from './orders.services';
import { OrderWithSub } from './orders.models';
import { Subscription } from 'rxjs';
import { Product } from '../products/product.model';
import { ProductService } from '../products/product.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy {
  orders: OrderWithSub[] = [];
  products: Product[] = [];
  
  orderForm: FormGroup;
  private ordersSubscription: Subscription | undefined;
  private productsSubscription: Subscription | undefined;
  shippingTypes: any[] = [];
  private shippingTypesSubscription: Subscription | undefined;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private productService: ProductService
  ) {
    this.orderForm = this.fb.group({
      customer_name: ['', Validators.required],
      observations: [''],
      shipping: [''],
      product_select: [''],
      products: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadOrders();
    this.loadProducts();
    this.loadShippingTypes();
  }

  loadShippingTypes(): void {
    this.shippingTypesSubscription = this.orderService.getOrderTypes().subscribe({
      next: (response) => {
        this.shippingTypes = response;
      },
      error: (err) => console.error('Error fetching shipping types', err)
    });
  }

  loadOrders() {
    this.ordersSubscription = this.orderService.getOrders().subscribe({
      next: (response) => {
        this.orders = response;
      },
      error: (err) => console.error('Error fetching orders', err)
    });
  }
  
  loadProducts() {
    this.productsSubscription = this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = Array.isArray(products) ? products : [];
      },
      error: (err) => console.error('Error fetching products', err)
    });
  }

  get productsArray() {
    return this.orderForm.get('products') as FormArray;
  }

  addProductToOrder(productId: string, quantity: number, observation: string = '') {
    const productsArray = this.productsArray;
    const existingProductIndex = productsArray.controls.findIndex(group =>
      group.get('product_id')?.value === productId
    );
  
    if (existingProductIndex === -1) {
      productsArray.push(this.fb.group({
        product_id: [productId, Validators.required],
        quantity: [quantity, [Validators.required, Validators.min(1)]],
        observation: [observation]
      }));
    } else {
      const existingGroup = productsArray.at(existingProductIndex);
      existingGroup.get('quantity')?.setValue(quantity);
      existingGroup.get('observation')?.setValue(observation);
    }
  }

  onProductChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const productId = selectElement.value;

    if (productId) {
      this.addProductToOrder(productId, 1);
    }
  }

  getProductName(productId: string | null): string {
    const product = this.products.find(p => p.product_id === productId);
    return product ? product.product_name : 'Unknown Product';
  }

  addSelectedProduct() {
    const selectedProductId = this.orderForm.get('product_select')?.value;
    const observationValue = (document.getElementById('observation_input') as HTMLInputElement)?.value || '';
    const quantity = 1;
    if (selectedProductId) {
      this.addProductToOrder(selectedProductId, quantity, observationValue);
      this.orderForm.get('product_select')?.setValue('');
    }
  }

  removeProduct(index: number) {
    this.productsArray.removeAt(index);
  }
  resetForm() {
    this.orderForm.reset({
      customer_name: '',
      observations: '',
      shipping: '',
      product_select: '',
      products: []
    });
  }
  onSubmit() {
    if (this.orderForm.valid) {
      const orderValue = { ...this.orderForm.value };
      delete orderValue.product_select;
      
      this.orderService.createOrder(orderValue).subscribe({
        next: (response) => {
          console.log('Order created', response);
          this.loadOrders();
          this.resetForm();
        },
        error: (err) => console.error('Error creating order', err)
      });
    }
  }

  ngOnDestroy(): void {
    if (this.ordersSubscription) {
      this.ordersSubscription.unsubscribe();
    }
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }
}
