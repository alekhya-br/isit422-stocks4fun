import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { HomepageComponent } from './homepage.component';
import { StockDataItem } from '../StockDataItem';
import { StockService } from '../stock-service.service';

describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomepageComponent],
      providers: [StockService]
    })
      .compileComponents().then(() =>
        fixture = TestBed.createComponent(HomepageComponent));
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
