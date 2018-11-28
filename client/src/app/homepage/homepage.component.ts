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

  apiMarketData: MarketDataItem[];
  marketData: MarketDataItem[];
  dowJonesStocks: StockDataItem[];
  sp500Stocks: StockDataItem[];
  nasdaqStocks: StockDataItem[];
  showChange: boolean;

  getApiMarketData(): void {
    this.myStockService.getApiMarketData().subscribe((apiMarketData: MarketDataItem[]) => {
      // const showChange = apiMarketData.findIndex(w => w.change_pct !== undefined) >= 0;
      this.apiMarketData = apiMarketData;
      // this.showChange = showChange;
    })
  }

  getMarketData(): void {
    this.myStockService.getMarketData().subscribe((marketData: MarketDataItem[]) => {
      this.marketData = marketData;
    })
  }

  getDowJonesStocks(): void {
    this.myStockService.getDowJonesDividend().subscribe((dowJonesStocks: StockDataItem[]) => {
      // const showChange = dowJonesStocks.findIndex(w => w.change_pct !== undefined) >= 0;
      this.dowJonesStocks = dowJonesStocks;
      // this.showChange = showChange;
    })
  }

  getSP500Stocks(): void {
    this.myStockService.getSP500Dividend().subscribe((sp500Stocks: StockDataItem[]) => {
      // const showChange = sp500Stocks.findIndex(w => w.change_pct !== undefined) >= 0;
      this.sp500Stocks = sp500Stocks;
      // this.showChange = showChange;
    })
  }

  getNasdaqStocks(): void {
    this.myStockService.getNasdaqDividend().subscribe((nasdaqStocks: StockDataItem[]) => {
      // const showChange = nasdaqStocks.findIndex(w => w.change_pct !== undefined) >= 0;
      this.nasdaqStocks = nasdaqStocks;
      // this.showChange = showChange;
    })
  }

  constructor(
    private myStockService: StockService) 
  { }

  ngOnInit() {
    this.getApiMarketData();
    this.getDowJonesStocks();
    this.getSP500Stocks();
    this.getNasdaqStocks();
  }

}
