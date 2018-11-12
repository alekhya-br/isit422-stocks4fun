import { Component, OnInit, Input } from '@angular/core';
import { MarketDataItem } from '../MarketDataItem';
import { StockDataItem } from '../StockDataItem';
import { StockService } from '../stock-service.service';

@Component({
  selector: 'app-quotesearch',
  templateUrl: './quotesearch.component.html',
  styleUrls: ['./quotesearch.component.scss']
})

export class QuotesearchComponent {
  @Input() stocks: StockDataItem;

  searchResult: StockDataItem;

  getStock(term: string): void {
    //const id = +this.route.snapshot.paramMap.get('id');
    this.myStockService.searchQuotes(term).subscribe((searchResult: StockDataItem) => {
      this.searchResult = searchResult;
    })
    console.log('getStock called');
     // .subscribe(stocks => this.stocks = stocks);
  }

  constructor(
    private myStockService: StockService) 
  { }

}
