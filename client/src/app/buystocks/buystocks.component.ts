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


  user: FirebaseUserModel = new FirebaseUserModel();
  profileForm: FormGroup;

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

  ngOnInit(): void {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.user = data;
        this.createForm(this.user.name);
      }
    });
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
