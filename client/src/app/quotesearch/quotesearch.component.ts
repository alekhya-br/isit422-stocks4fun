import { Component, OnInit } from '@angular/core';
import { MarketDataItem } from '../MarketDataItem';
import { StockService } from '../stock-service.service';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

@Component({
  selector: 'app-quotesearch',
  templateUrl: './quotesearch.component.html',
  styleUrls: ['./quotesearch.component.scss']
})
export class QuotesearchComponent implements OnInit {

  marketData: MarketDataItem[];

  getMarketData(): void {
    this.myStockService.getMarketData().subscribe((marketData: MarketDataItem[]) => {
      this.marketData = marketData;
    })
  }
  getSearchData(PassedinSymbol:string): void {
      this.myStockService.searchQuotes(PassedinSymbol).subscribe(); 
 
      
  }


  constructor(private myStockService: StockService) { }

  ngOnInit() {
    this.getMarketData();
  }

}
