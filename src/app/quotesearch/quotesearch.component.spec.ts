import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotesearchComponent } from './quotesearch.component';

describe('QuotesearchComponent', () => {
  let component: QuotesearchComponent;
  let fixture: ComponentFixture<QuotesearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotesearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotesearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
