import { Component, OnInit, Input } from '@angular/core';
import { StockDataItem } from '../StockDataItem';
import { StockService } from '../stock-service.service';
import { UserService } from '../core/user.service';
import { AuthService } from '../core/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseUserModel } from '../core/user.model';
import { CrudService } from '../crud-service.service';
import { OrderItem } from '../OrderItem';
import { NgModule } from '@angular/core';
@Component({
  selector: 'app-buystocks',
  templateUrl: './buystocks.component.html',
  styleUrls: ['./buystocks.component.scss']
})

export class BuystocksComponent {
  @Input() stocks: StockDataItem;

  searchText: string = 'TSLA';
  searchResult: StockDataItem[];
  showChange: boolean;
  
  stockSymbol = 'unknown';
  stockName = 'unknown';
  stockPrice = 0.0;
  stockQuantity = 0;


  user: FirebaseUserModel = new FirebaseUserModel();
  profileForm: FormGroup;

  setModalFields(stockSymbol, stockName, stockPrice) {
    this.stockSymbol = stockSymbol;
    this.stockName = stockName;
    this.stockPrice = stockPrice;
    console.log('setModalFields called');
  }

  getStock(term: string): void {
    //const id = +this.route.snapshot.paramMap.get('id');
    this.myStockService.searchQuotes(term).subscribe((searchResult: StockDataItem[]) => {
      const showChange = searchResult.findIndex(w => w.change_pct !== undefined) >= 0;
      this.searchResult = searchResult;
      this.showChange = showChange;
      console.log(`getStock result,`)
      console.log(searchResult)
    })
    console.log('getStock called');
    // .subscribe(stocks => this.stocks = stocks);
  }

  buyStock() {
    var newID = Object;
    var newItem: OrderItem = { user_uid: this.user.uid, stock_symbol: this.stockSymbol, stock_name: this.stockName, stock_quantity: this.stockQuantity, stock_price: this.stockPrice, _id: newID };
    this.myCrudService.insertOrder(newItem as OrderItem).subscribe();

    this.stockName = 'unknown';
    this.stockSymbol = 'unknown';
    this.stockPrice = 0.0;
    this.stockQuantity = 0;
    alert("Successfully bought stocks.");
  }

  createForm(name) {
    this.profileForm = this.fb.group({
      name: [name, Validators.required]
    });
  }

  save(value) {
    this.userService.updateCurrentUser(value)
      .then(res => {
        console.log(res);
      }, err => console.log(err))
  }

  TheOrders: OrderItem[];

  selectedOrderItem: OrderItem;
  selectedCrudItemPriorOrdername: string;

  addNewOrder(iSymbol: string, iName: string, iQuantity: number, iPrice: number): void {
    iSymbol = iSymbol.trim();
    iName = iName.trim();
    var newID = Object;
    var newItem: OrderItem = { user_uid: this.user.uid, stock_symbol: iSymbol, stock_name: iName, stock_quantity: iQuantity, stock_price: iPrice, _id: newID };
    this.myCrudService.insertOrder(newItem as OrderItem);
  }

  ngOnInit(): void {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.user = data;
        this.createForm(this.user.name);
      }
    });
    //this.getOrders();
  }

  constructor(
    private myCrudService: CrudService,
    public userService: UserService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    private myStockService: StockService
    ) { }

}
