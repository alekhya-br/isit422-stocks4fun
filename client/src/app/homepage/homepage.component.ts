import { Component, OnInit, Input } from '@angular/core';
import { MarketDataItem } from '../MarketDataItem';
import { StockDataItem } from '../StockDataItem';
import { StockService } from '../stock-service.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})

export class HomepageComponent implements OnInit {
  @Input() stocks: StockDataItem;

  marketData: MarketDataItem[];
  winningStocks: StockDataItem[];
  losingStocks: StockDataItem[];

  getMarketData(): void {
    this.myStockService.getMarketData().subscribe((marketData: MarketDataItem[]) => {
      this.marketData = marketData;
    })
  }

  getWinningStocks(): void {
    this.myStockService.getWinningStocks().subscribe((winningStocks: StockDataItem[]) => {
      this.winningStocks = winningStocks;
    })
  }

  getLosingStocks(): void {
    this.myStockService.getLosingStocks().subscribe((losingStocks: StockDataItem[]) => {
      this.losingStocks = losingStocks;
    })
  }

  constructor(
    private myStockService: StockService) 
  { }

  ngOnInit() {
    this.getMarketData();
    this.getWinningStocks();
    this.getLosingStocks();
  }

}
