import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders  } from "@angular/common/http";
import { Observable, map , Subject} from "rxjs";
import { OrderResponse, OrderWithSub} from "./orders.models";
import { OrderType } from "./orders_type.model";
import { OrderTypeResponse } from "./orders_type.model";

@Injectable({
    providedIn: 'root'
  })
  export class OrderService {
  
    private apiUrl = 'http://localhost:8001/api/v1/orders';
    private orderTypesUrl = 'http://localhost:8001/api/v1/order-types';
  
    private httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  
    constructor(private http: HttpClient) { }
  
    createOrder(order: OrderWithSub): Observable<OrderResponse> {
      return this.http.post<OrderResponse>(this.apiUrl, order, this.httpOptions);
    }
  
    getOrders(): Observable<OrderWithSub[]> {
      return this.http.get<OrderWithSub[]>(this.apiUrl);
    }

    getOrdersWithSub(): Observable<OrderWithSub[]> {
      return this.http.get<OrderWithSub[]>(this.apiUrl);
    }

    getOrderTypes(): Observable<OrderType[]> {
      return this.http.get<OrderTypeResponse>(this.orderTypesUrl).pipe(
        map(response => response.data)
      );
    }
  
    updateOrderStatus(orderId: string, orderStatus: number): Observable<OrderResponse> {
      const url = `${this.apiUrl}/${orderId}`;
      return this.http.patch<OrderResponse>(url, { order_status: orderStatus }, this.httpOptions);
    }
  }