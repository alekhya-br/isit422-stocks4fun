import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BuystocksComponent } from './buystocks.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../core/user.service';
import { AngularFirestore } from 'angularfire2/firestore';

describe('BuystocksComponent', () => {
  let component: BuystocksComponent;
  let fixture: ComponentFixture<BuystocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule],
      declarations: [BuystocksComponent],
      providers: [UserService, AngularFirestore]
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
