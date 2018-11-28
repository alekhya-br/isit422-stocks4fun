import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuystocksComponent } from './buystocks.component';

describe('BuystocksComponent', () => {
  let component: BuystocksComponent;
  let fixture: ComponentFixture<BuystocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuystocksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuystocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
