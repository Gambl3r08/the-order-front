import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, map , Subject} from "rxjs";
import { Product } from "./product.model";
import { tap } from 'rxjs/operators';

interface ProductResponse {
  status: number;
  message: string;
  data: Product[];
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:8001/api/v1/products';
  private productCreatedSubject = new Subject<void>();
  productCreated$ = this.productCreatedSubject.asObservable();
  constructor(private http: HttpClient) { }
 
  getProducts(): Observable<Product[]> {
    return this.http.get<ProductResponse>(this.apiUrl).pipe(
      map(response => response.data)
    );
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product).pipe(
      tap(() => {this.productCreatedSubject.next();})
    );
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${product.product_id}`, product);
  }
}
