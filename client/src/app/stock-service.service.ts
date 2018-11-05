import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StockItem } from './StockItem';

@Injectable({ providedIn: 'root' })
export class StockService {
  constructor(private http: HttpClient) { }

  getAllStocks(): Observable<StockItem[]> {
    return this.http.get<StockItem[]>('http://localhost:3000/stock/api/');
  }

}

