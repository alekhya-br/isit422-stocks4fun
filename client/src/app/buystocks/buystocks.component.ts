import { Component, OnInit, Input } from '@angular/core';
import { MarketDataItem } from '../MarketDataItem';
import { StockDataItem } from '../StockDataItem';
import { StockService } from '../stock-service.service';

@Component({
  selector: 'app-buystocks',
  templateUrl: './buystocks.component.html',
  styleUrls: ['./buystocks.component.scss']
})

export class BuystocksComponent {
  @Input() stocks: StockDataItem;

  searchText: string = 'TSLA';
  searchResult: StockDataItem[];
  showChange: boolean;

  getStock(term: string): void {
    //const id = +this.route.snapshot.paramMap.get('id');
    this.myStockService.searchQuotes(term).subscribe((searchResult: StockDataItem[]) => {
      const showChange = searchResult.findIndex(w => w.change_pct !== undefined) >= 0;
      this.searchResult = searchResult;
      this.showChange = showChange;
      console.log(`getStock result,`)
      console.log(searchResult)
    })
    console.log('getStock called');
    // .subscribe(stocks => this.stocks = stocks);
  }

  constructor(
    private myStockService: StockService) { }

}
