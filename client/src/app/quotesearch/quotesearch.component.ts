import { Component, OnInit, Input } from '@angular/core';
import { StockDataItem } from '../StockDataItem';
import { StockService } from '../stock-service.service';
import { ActivatedRoute } from '@angular/router';

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
  stockData: Observable<StockDataItem[]>;
  private searchTerms = new Subject<string>();
  @Input() stocks: StockDataItem;

  search(term: string): void {
    this.searchTerms.next(term);
  }
<<<<<<< HEAD
  getStock(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.myStockService.searchQuotes(id)
     // .subscribe(stocks => this.stocks = stocks);
=======
  getSearchData(PassedinSymbol:string): void {
      this.myStockService.searchQuotes(PassedinSymbol).subscribe(); 
 
      
>>>>>>> 4ec34cb7321e1de926f1d601fb985c15b600755b
  }

  constructor(private route: ActivatedRoute,
    private myStockService: StockService) { }

  ngOnInit() {
    this.stockData = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((id: number) => this.myStockService.searchQuotes(id)),
    );
  }

}
