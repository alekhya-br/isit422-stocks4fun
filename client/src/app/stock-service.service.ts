import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MarketDataItem } from './MarketDataItem';
import { StockDataItem } from './StockDataItem';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';
import * as Moment from 'moment';

@Injectable({ providedIn: 'root' })
export class StockService {
  private stocksUrl = 'http://localhost:3000/stock/api/stock_search';

  constructor(private http: HttpClient,
    private messageService: MessageService) { }

  getApiMarketData(): Observable<MarketDataItem[]> {
    return this.http.get<MarketDataItem[]>('http://localhost:3000/api/stock_data/');
  }

  getMarketData(): Observable<MarketDataItem[]> {
    return this.http.get<MarketDataItem[]>('http://localhost:3000/stock/api/market_data/');
  }

  getWinningStocks(): Observable<StockDataItem[]> {
    return this.http.get<StockDataItem[]>('http://localhost:3000/stock/api/winning_stocks/');
  }

  getLosingStocks(): Observable<StockDataItem[]> {
    return this.http.get<StockDataItem[]>('http://localhost:3000/stock/api/losing_stocks/');
  }

  searchQuotes(term: string): Observable<StockDataItem> {
    console.log('search quotes called');
    const url = `${this.stocksUrl}/${term}`;
    return this.http.get<StockDataItem>(url).pipe(
      tap(_ => this.log(`fetched stock term=${term}`)),
      catchError(this.handleError<StockDataItem>(`getstock term=${term}`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a StockService message with the MessageService */
  private log(message: string) {

    this.messageService.add(`StockService: ${message}`);
  }
}

