import { Component, OnInit } from '@angular/core';
import { StockItem } from '../StockItem';
import { StockService } from '../stock-service.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  marketStocks: StockItem[];

  getStocks(): void {
    this.myStockService.getAllStocks().subscribe((stockData: StockItem[]) => {
      this.marketStocks = stockData;
    })
  }

  constructor(private myStockService: StockService) 
  { }

  ngOnInit() {
    this.getStocks();
  }

}
