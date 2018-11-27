import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserItem } from './UserItem';
import { OrderItem } from './OrderItem';
import { MarketDataItem } from './MarketDataItem';
import { StockDataItem } from './StockDataItem';

@Injectable({ providedIn: 'root' })
export class CrudService {
  constructor(private http: HttpClient) { }


  getAllUsers(): Observable<UserItem[]> {
    return this.http.get<UserItem[]>('http://localhost:3000/user/api/user_data/');
  }

  insertUser(newUser: UserItem): Observable<UserItem> {
    return this.http.post<UserItem>('http://localhost:3000/user/api/user_data/', newUser);
  }

  // since we don't need to wait for the delete to happen, not using observable
  deleteUser(_id: Number) {
    return this.http.delete('http://localhost:3000/user/api/user_data/' + _id);
  }

  updateUser(_id: Number, updatedUser: UserItem): Observable<void> {
    return this.http.put<void>('http://localhost:3000/user/api/user_data/' + _id, updatedUser);
  }

  getAllOrders(): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>('http://localhost:3000/order/api/order_data/');
  }

  insertOrder(newOrder: OrderItem): Observable<OrderItem> {
    return this.http.post<OrderItem>('http://localhost:3000/order/api/order_data/', newOrder);
  }

  // since we don't need to wait for the delete to happen, not using observable
  deleteOrder(_id: Number) {
    return this.http.delete('http://localhost:3000/order/api/order_data/' + _id);
  }

  updateOrder(_id: Number, updatedOrder: OrderItem): Observable<void> {
    return this.http.put<void>('http://localhost:3000/order/api/order_data/' + _id, updatedOrder);
  }

}

