import { ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, DoCheck, ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductService } from '../product.service';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
  encapsulation: ViewEncapsulation.None

})
export class ShoppingListComponent implements OnInit, OnDestroy, DoCheck {
  productList: any[] = [];
  auctionList: any[] = [];
  productId: any;
  selectChipList: any = "";
  sortBy: any = "";
  deliveryOption: any = "";
  layoutSel: any = "view_module";
  pageName: any;
  expandFilter: any = [];
  shopping: any;
  selectAuc: any = "Auction";
  discOptions: any = [];
  matChipList: any[] = [];
  layout: any[] = [
    {
      "name": "format_list_bulleted",
      "value": "format_list_bulleted"
    },
    {
      "name": "view_module",
      "value": "view_module"
    }
  ];
  auction: any[] = [
    {
      "name": "Show All",
      "value": "Show_All"
    },
    {
      "name": "Auction",
      "value": "Auction"
    },
    {
      "name": "Buy Now",
      "value": "Buy_Now"
    },
  ]
  constructor(private matDialog: MatDialog, private product: ProductService, private cd: ChangeDetectorRef, private router: ActivatedRoute, private route: Router, private app: AppService) { }
  ngOnInit(): void {
    this.pageName = this.router.snapshot.params['name'];
    this.matChipList = [
      {
        "name": "World Wide Shipping",
        "value": "world_wide_ship"
      },
      {
        "name": "Under $500",
        "value": "under_50"
      },
      {
        "name": "Jeans",
        "value": "Jeans"
      },
      {
        "name": "Pucker Shoes",
        "value": "pucker_shoes"
      },
    ];
    this.getProducts();
    this.getSearchVal();
  }
  getProducts() {
    this.shopping = this.product.getProducts(this.pageName).subscribe((res: any) => {
      this.auctionList = res.products;
      this.auctionList.map(data => {
        if (data.type == 'Music') {
          data.audio = new Audio(data.mp3);
          data.playIcon = "play_circle_outline"
        }
        if (data.price > 1000) {
          data.worldWideShip = true;
        } else data.worldWideShip = false;
        const date = new Date();
        // data.yearOfManufacture = Math.floor(Math.random() * (1990 - date.getFullYear())) + date.getFullYear();
        let randomId = Math.floor(Math.random() * 15);
        if (data.id == randomId) data.stock = false; else data.stock = true;
      });
      this.productList = this.auctionList.filter(e => e.Auction == true);
      this.calDiscount();
      this.getDiscount();
      this.cd.markForCheck();
    })
  }

  ngOnDestroy(): void {
    this.shopping.unsubscribe();
  }
  watchList(i: any, watch: any) {
    if (watch) {
      return "favorite"
    } else return "favorite_border"
  }
  watchClick(data: any) {
    if (data.watch) {
      data.watch = false;
    } else data.watch = true;
    this.setWatch();
  }
  selectChip(chip: any) {
    if (chip.value == this.selectChipList) {
      this.selectChipList = "";
      return;
    }
    this.selectChipList = chip.value;
  }
  sortByVal(value: any) {
    this.sortBy = value;
  }
  year: any = [];
  getYear(e: any) {
    //console.log(e.split("-"));
    let year: any = [];
    let list;
    let check = 1;
    if (this.year.includes(e)) {
      let index = this.expandFilter.indexOf(e);
      this.year.splice(index, 1);
      this.auctionVal(this.selectAuc);
      check = 0;
    }
    if (check == 1) this.year.push(e);
    this.year.forEach((yr: any) => {
      year = yr.split("-");
      list = this.productList.filter(e => e.yearOfManufacture >= year[0] && e.yearOfManufacture <= year[1]);
      this.productList = list;
    })
    if (this.year.length == 0) this.auctionVal(this.selectAuc);
  }
  deliveryOptions(val: any) {
    this.deliveryOption = val;
  }
  getExpandFilter(val: any) {
    let check = 1;
    if (this.expandFilter.includes(val)) {
      let index = this.expandFilter.indexOf(val);
      this.expandFilter.splice(index, 1);
      this.auctionVal(this.selectAuc);
      check = 0;
      // return;
    }
    let list: any;
    if (check == 1) this.expandFilter.push(val);
    this.expandFilter.forEach((valType: string) => {
      if (valType == "Recommended") list = this.productList.filter((e: any) => e.rating < 4);
      if (valType == "Expiring Soon") list = this.productList.filter((e: any) => e.yearOfManufacture < 2000);
      if (valType == "Recently Added") list = this.productList.filter((e: any) => e.yearOfManufacture > 2010);
      if (valType == "Most Rated") list = this.productList.filter((e: any) => e.rating < 4.5);
      if (valType == "Price: Low -> High") list = this.productList.sort((a, b) => a.price - b.price);
      if (valType == "Price: High -> Low") list = this.productList.sort((a, b) => b.price - a.price);
      else this.auctionVal(this.selectAuc);
      this.productList = list;
    });
    // if (val == "Price: Low -> High") //return this.sortBy = "useless_first"; else return this.sortBy = "useless_second";
    if (this.expandFilter.length == 0) this.auctionVal(this.selectAuc);

  }
  setWatch() {
    const watch = this.productList.filter(e => e.watch == true)
    this.app.postVal(watch.length);
  }
  ngDoCheck(): void {
  }
  playSet(data: any) {
    if (!data.play) {
      this.productList.map(e => {
        e.play = false;
        e.playIcon = "play_circle_outline";
        e.audio.pause();
      })
      data.play = true;
      data.playIcon = "pause_circle_outline";
      data.audio.play();
    } else {
      data.play = false;
      data.playIcon = "play_circle_outline";
      data.audio.pause();
    }
  }
  quickView(data: any) {
    // data.addToCart = false;
    this.matDialog.open(ProductDetailComponent, {
      data: data
    });
  }
  auctionVal(value: any) {
    let list;
    this.selectAuc = value;
    if (value == "Auction") {
      list = this.auctionList.filter(e => e.Auction == true);
    } else if (value == "Buy_Now") {
      list = this.auctionList.filter(e => e.Auction == false);
    } else {
      list = this.auctionList;
    }
    this.productList = list;
    this.calDiscount();
    this.getDiscount();
  }
  getSearchVal() {
    let value = "";
    this.app.getValSearch().subscribe((e: any) => {
      value = e;
      let data = this.product.searchResult();
      data = data.filter(e => e.title == value);
      if (data.length != 0) this.productList = data;
    })

  }
  calDiscount() {
    this.productList.map(e => {
      let discountAmt = (parseFloat(e.discountPercentage) * parseFloat(e.price)) / 100;
      e.finalAmt = e.price - discountAmt;
    })
  }
  getDiscount() {
    let disArr: any = [];
    this.productList.forEach((val: any) => {
      disArr.push(val.discountPercentage);
    });
    disArr = disArr.filter((val: any, i: any) => {
      return disArr.indexOf(val) == i;
    })
    this.discOptions = disArr;
  }
  setDiscount(val: any) {
    this.auctionVal(this.selectAuc);
    let list;
    list = this.productList.filter((e) => e.discountPercentage == val);
    this.productList = list;
    if(val == 'all') this.auctionVal(this.selectAuc);
  }
}
