import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/user.service';
import { AuthService } from '../core/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseUserModel } from '../core/user.model';
import { UserItem } from '../UserItem';
import { CrudService } from '../crud-service.service';
import { StockService } from '../stock-service.service';
import { StockDataItem } from '../StockDataItem';

@Component({
  selector: 'page-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.component.scss']
})
export class UserComponent implements OnInit {
  TheUsers: UserItem[];
  searchResult: StockDataItem[];

  buy: Boolean = true;
  symbol: string;
  quantity: number;
  price: number;

  _id;

  portfolio: any = {};

  setModalFields(buy, stock?, qty?, price?) {
    this.buy = buy;
    this.symbol = stock;
    this.quantity = qty;
    this.price = price;
  }

  buyOrSellStock() {
    this.myStockService.searchQuotes(this.symbol).subscribe((searchResult: StockDataItem[]) => {
      this.searchResult = searchResult;
    });
    this.myCrudService.buySellStock(this.portfolio, this._id, this.symbol, this.buy ? this.quantity : -this.quantity , this.searchResult[0].price).subscribe((res) => {
        alert("Successfully bought/sold stocks.");
      });
  }


  user: FirebaseUserModel = new FirebaseUserModel();subscribesubscribe
  profileForm: FormGroup;

  constructor(
    private myCrudService: CrudService,
    public userService: UserService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    private myStockService: StockService
  ) {

  }

  ngOnInit(): void {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.user = data;
        this.createForm(this.user.name);
      }
    }),
    this._id = this.route.snapshot.paramMap.get('id');
    console.log("Getting portfolio: " + this._id);
    this.myCrudService.getPortfolio(this._id).subscribe((UserData: UserItem[]) => {
      this.portfolio = UserData;
    });
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

}