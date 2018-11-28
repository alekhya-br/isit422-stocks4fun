import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/user.service';
import { AuthService } from '../core/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseUserModel } from '../core/user.model';
import { OrderItem } from '../OrderItem';
import { CrudService } from '../crud-service.service';

@Component({
  selector: 'page-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.component.scss']
})
export class UserComponent implements OnInit {

  theOrders: OrderItem[];

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

  constructor(
    private myCrudService: CrudService,
    public userService: UserService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.user = data;
        this.createForm(this.user.name);
      }
    });
    this.getOrders();
  }

  sellStock() {

    this.stockName = 'unknown';
    this.stockSymbol = 'unknown';
    this.stockPrice = 0.0;
    this.stockQuantity = 0;
    alert("Successfully sold stocks.");
  }

  getOrders(): void {
    this.myCrudService.getUserOrders(this.user.uid).subscribe((OrderData: OrderItem[]) => {
      this.theOrders = OrderData;
      console.log("return from getOrders");
      console.log("TheOrders size is " + this.theOrders.length);
    });
    console.log("get orders called");
    //console.log("TheOrders size is " + this.TheOrders.length);
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