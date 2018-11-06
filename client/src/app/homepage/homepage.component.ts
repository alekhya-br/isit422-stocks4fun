import { Component, OnInit, Input } from '@angular/core';
import { MarketDataItem } from '../MarketDataItem';
import { StockService } from '../stock-service.service';

import { StockDataItem } from '../StockDataItem';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  @Input() stocks: StockDataItem;

  marketData: MarketDataItem[];

  getMarketData(): void {
    this.myStockService.getMarketData().subscribe((marketData: MarketDataItem[]) => {
      this.marketData = marketData;
    })
  }
  constructor(
    private myStockService: StockService) 
  { }

  ngOnInit() {
    this.getMarketData();
  }

}
