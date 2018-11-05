import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MarketDataItem } from './MarketDataItem';

@Injectable({ providedIn: 'root' })
export class StockService {
  constructor(private http: HttpClient) { }

  getMarketData(): Observable<MarketDataItem[]> {
    return this.http.get<MarketDataItem[]>('http://localhost:3000/stock/api/market_data/');
  }

}

