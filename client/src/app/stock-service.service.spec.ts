import { TestBed, inject, async } from '@angular/core/testing';
import { StockService } from './stock-service.service';
import { HttpClientModule, HttpClient, HttpEvent }    from '@angular/common/http';
import { HttpModule } from '@angular/http';
export interface StockDataItem {
  name: string;
}

describe('StockService', () => {
  beforeEach(async(() => {
  TestBed.configureTestingModule({
    imports: [ HttpClientModule ],
    declarations: [  ]
  })
  .compileComponents();
  }));

  it('should be created', () => {
    const service: StockService = TestBed.get(StockService);
    expect(service).toBeTruthy();
  });

  it('retrieves all the market indexes', () => {
    //const service: CatService = TestBed.get(CatService);
    const service: StockService = TestBed.get(StockService);
      result => expect(service.getApiMarketData.length).toBeGreaterThan(0);
    }); 

  it('retrieves top DowJonesStocks stocks', () =>{
    const service: StockService = TestBed.get(StockService);
      result => expect(service.getDowJonesDividend.length).toBeGreaterThan(0);
    }); 

  it('retrievest top SP500Stocks stocks', () => {
    const service: StockService = TestBed.get(StockService);
      result => expect(service.getSP500Dividend.length).toBeGreaterThan(0);
    });
  
  it('search quote should return real data', (done) => {
    let stockData: StockDataItem[];
    const service: StockService = TestBed.get(StockService);
    service.searchQuotes('TSLA').subscribe((stockData)=> {
      expect(stockData[1].name).toEqual("Tesla Inc");
      done();
    });

  });

});
