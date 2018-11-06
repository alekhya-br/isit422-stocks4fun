import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MarketDataItem } from './MarketDataItem';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class StockService {
  private stocksUrl = 'http://localhost:3000/stock/api/market_data/';
  
  constructor(private http: HttpClient,
    private messageService: MessageService) { }

  getMarketData(): Observable<MarketDataItem[]> {
    return this.http.get<MarketDataItem[]>('http://localhost:3000/stock/api/market_data/');
  }

  searchQuotes(term: string): Observable<MarketDataItem[]> {
    if (!term.trim()) {
      // if not search term, return empty stock array.
      return of([]);
    }
    return this.http.get<MarketDataItem[]>(`${this.stocksUrl}/?symbol=${term}`).pipe(
      tap(_ => this.log(`found symbols matching "${term}"`)),
      catchError(this.handleError<MarketDataItem[]>('searchQuotes', []))
    );
  } 

  private handleError<T> (operation = 'operation', result?: T) {
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

