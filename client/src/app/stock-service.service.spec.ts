import { TestBed } from '@angular/core/testing';
import { StockService } from './stock-service.service';
import { inject } from '@angular/core';
import { async } from 'async';

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
});
