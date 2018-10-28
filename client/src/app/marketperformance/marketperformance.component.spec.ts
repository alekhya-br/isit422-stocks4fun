import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketperformanceComponent } from './marketperformance.component';

describe('MarketperformanceComponent', () => {
  let component: MarketperformanceComponent;
  let fixture: ComponentFixture<MarketperformanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketperformanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketperformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
