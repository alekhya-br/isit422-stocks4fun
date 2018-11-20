import { TestBed, inject, async } from '@angular/core/testing';
import { StockService } from './stock-service.service';

describe('StockService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StockService = TestBed.get(StockService);
    expect(service).toBeTruthy();
  });

  it('retrieves all the market indexes', async(inject([StockService], (service) => {
    service.getApiMarketData().subscribe(result => {
      expect(result.length).toBeGreaterThan(0);
    });
  })));

  it('retrieves all winning stocks', async(inject([StockService], (service) => {
    service.getWinningStock().subscribe(result => {
      expect(result.length).toBeGreaterThan(0);
    });
  })));

  it('retrieves all losing stocks', async(inject([StockService], (service) => {
    service.getLosingStocks().subscribe(result => {
      expect(result.length).toBeGreaterThan(0);
    });
  })));
});
