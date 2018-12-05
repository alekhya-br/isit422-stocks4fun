import { Component, OnInit } from '@angular/core';
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

  orderID = 0;
  stockSymbol = 'unknown';
  stockName = 'unknown';
  stockPrice = 0.0;
  stockQuantity = 0;


  user: FirebaseUserModel = new FirebaseUserModel();
  profileForm: FormGroup;

  setModalFields(orderID, stockSymbol, stockName, stockQuantity, stockPrice) {
    this.orderID = orderID;
    this.stockSymbol = stockSymbol;
    this.stockName = stockName;
    this.stockQuantity = stockQuantity;
    this.stockPrice = stockPrice;
    console.log('setModalFields called');
  }

  constructor(
    private myCrudService: CrudService,
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

  sellStock(sellQuantity: number) {
    if(sellQuantity > 0) {
      if(sellQuantity < this.stockQuantity) {
        var updateItem: OrderItem = { _id: Object, user_uid: this.user.uid, stock_symbol: this.stockSymbol, stock_name: this.stockName, stock_price: this.stockPrice, stock_quantity: this.stockQuantity - sellQuantity };
        this.myCrudService.updateOrder(this.orderID, updateItem)
          .subscribe(
            // nothing to do
          );
        //for (pointer; pointer >= 0; pointer--) {
        //  if (this.theOrders[pointer]._id === this.orderID as Number) {
        //    this.theOrders[pointer].stock_quantity = this.stockQuantity - sellQuantity;
        //  }
        //};
        this.orderID = 0;
        this.stockName = 'unknown';
        this.stockSymbol = 'unknown';
        this.stockPrice = 0.0;
        this.stockQuantity = 0;
        alert("Successfully sold " + sellQuantity + " stocks.");
        window.location.reload();
      }
      else {
        //delete db entry
        this.myCrudService.deleteOrder(this.orderID) // it is a base 16 number
          .subscribe();
        // update local data
        var pointer = this.theOrders.length - 1;
        for (pointer; pointer >= 0; pointer--) {
          if (this.theOrders[pointer]._id === this.orderID as Number) {
            this.theOrders.splice(pointer, 1);
          }
        };
      }
    }
    else {
      alert("No stocks sold.");
    }
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

}