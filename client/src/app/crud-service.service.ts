import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserItem } from './UserItem';
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

  createPortfolio(_id: Number, portfolioName: UserItem): Observable<any> {
    console.log("Adding portfolio: " + portfolioName);
    return this.http.post<UserItem>('http://localhost:3000/user/api/user_data/' + _id, portfolioName);
  }

  getPortfolio(_id: Number): Observable<any> {
    console.log("Getting portfolio: " + _id);
    return this.http.get<UserItem[]>('http://localhost:3000/user/api/user_data/' + _id);
  }
  
  deletePortfolio(_id: Number): Observable<any> {
    return this.http.delete('http://localhost:3000/user/api/user_data/' + _id);
  }

  buySellStock(portfolio, _id: number, symbol:string, quantity:number, price: number): Observable<any> {
    console.log("Buying stock: " + symbol + " for portfolioId:" + _id);

    if (!portfolio.stocks) {
      portfolio.stocks = [];
    }
    // Push new stock if new symbol ELSE update existing qty and add/remove earnings...
    portfolio.stocks.push({
      portfolioId: _id,
      symbol: symbol,
      purchaseQuantity: quantity,
      purchasePrice: price
    });
    return this.http.put<StockDataItem>('http://localhost:3000/stock/api/stock_data/' + _id, portfolio);
}

}

