import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule }    from '@angular/common/http';
import { QuotesearchComponent } from './quotesearch.component';

describe('QuotesearchComponent', () => {
  let component: QuotesearchComponent;
  let fixture: ComponentFixture<QuotesearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpClientModule ],
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

  it('should call getStock',() => {
    result=> expect(component.getStock).toHaveBeenCalledWith('TSLA');
  });
});

