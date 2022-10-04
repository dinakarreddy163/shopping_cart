import { ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, DoCheck } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { ProductService } from '../product.service';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShoppingListComponent implements OnInit, OnDestroy, DoCheck {
  productList: any[] = [];
  productId: any;
  selectChipList: any = "";
  sortBy: any = "";
  deliveryOption: any = "";
  layoutSel: any = "view_module";
  pageName: any;
  expandFilter: any = [];
  shopping: any;
  matChipList = [
    {
      "name": "World Wide Shipping",
      "value": "world_wide_ship"
    },
    {
      "name": "Under $50",
      "value": "under_50"
    },
    {
      "name": "Kitchen",
      "value": "kitchen"
    },
    {
      "name": "Pucker Shoes",
      "value": "pucker_shoes"
    },
  ];
  layout: any[] = [
    {
      "name": "format_list_bulleted",
      "value": "format_list_bulleted"
    },
    {
      "name": "view_module",
      "value": "view_module"
    }
  ]
  constructor(private product: ProductService, private cd: ChangeDetectorRef, private router: ActivatedRoute, private route: Router, private app: AppService) { }
  ngOnInit(): void {
    this.pageName = this.router.snapshot.params['name'];
    this.getProducts();
    // if (this.pageName == 'local_movies') {
    //   this.getMovies();
    // }
    // else if (this.pageName == 'library_music') {
    //   this.getMusic();
    // }
    // else if (this.pageName == 'pets') {
    //   this.getPets();
    // }
    // else if (this.pageName == 'kitchen') {
    //   this.getKitchen();
    // }
    // else if (this.pageName == 'card_travel') {
    //   this.getTravel();
    // }
    // else if (this.pageName == 'nature') {
    //   this.getNature();
    // }
    // else if (this.pageName == 'sports') {
    //   this.getSports();
    // }
    // else if (this.pageName == 'electric_bolt') {
    //   this.getElectric();
    // }
    // else if (this.pageName == 'child_care') {
    //   this.getChildCare();
    // }
    // else if (this.pageName == 'toys') {
    //   this.getToys();
    // }
    // else {
    //   this.getProducts();
    // }
  }
  getProducts() {
    this.shopping = this.product.getProducts(this.pageName).subscribe((res: any) => {
      this.productList = res.products;
      this.productList.map(data => {
        if (data.type == 'Music') {
          data.audio = new Audio(data.mp3);
          data.playIcon = "play_circle_outline"
        }
        if (data.price > 1000) {
          data.worldWideShip = true;
        } else data.worldWideShip = false;
        const date = new Date();
        data.yearOfManufacture = Math.floor(Math.random() * (1990 - date.getFullYear())) + date.getFullYear();
        let randomId = Math.floor(Math.random() * 15);
        if (data.id == randomId) data.stock = false; else data.stock = true;
      });
      console.log(this.productList)
      this.cd.markForCheck();
    })
  }
  // getMovies() {
  //   this.shopping = this.product.getMovies().subscribe((res: any) => {
  //     this.productList = res.products;
  //     this.productList.map(data => {
  //       if (data.price > 1000) {
  //         data.worldWideShip = true;
  //       } else data.worldWideShip = false;
  //       const date = new Date();
  //       data.yearOfManufacture = Math.floor(Math.random() * (1990 - date.getFullYear())) + date.getFullYear();
  //       let randomId = Math.floor(Math.random() * 15);
  //       if (data.id == randomId) data.stock = false; else data.stock = true;
  //     });
  //     console.log(this.productList)
  //     this.cd.markForCheck();
  //   })
  // }
  // getMusic() {
  //   this.shopping = this.product.getMusic().subscribe((res: any) => {
  //     this.productList = res.products;
  //     this.productList.map(data => {
  //       data.audio = new Audio(data.mp3);
  //       data.playIcon = "play_circle_outline"
  //       if (data.price > 1000) {
  //         data.worldWideShip = true;
  //       } else data.worldWideShip = false;
  //       const date = new Date();
  //       data.yearOfManufacture = Math.floor(Math.random() * (1990 - date.getFullYear())) + date.getFullYear();
  //       let randomId = Math.floor(Math.random() * 15);
  //       if (data.id == randomId) data.stock = false; else data.stock = true;
  //     });
  //     console.log(this.productList)
  //     this.cd.markForCheck();
  //   })
  // }
  // getPets() {
  //   this.shopping = this.product.getPets().subscribe((res: any) => {
  //     this.productList = res.products;
  //     this.productList.map(data => {
  //       if (data.price > 1000) {
  //         data.worldWideShip = true;
  //       } else data.worldWideShip = false;
  //       const date = new Date();
  //       data.yearOfManufacture = Math.floor(Math.random() * (1990 - date.getFullYear())) + date.getFullYear();
  //       let randomId = Math.floor(Math.random() * 15);
  //       if (data.id == randomId) data.stock = false; else data.stock = true;
  //     });
  //     console.log(this.productList)
  //     this.cd.markForCheck();
  //   })
  // }
  // getKitchen() {
  //   this.shopping = this.product.getKitchen().subscribe((res: any) => {
  //     this.productList = res.products;
  //     this.productList.map(data => {
  //       if (data.price > 1000) {
  //         data.worldWideShip = true;
  //       } else data.worldWideShip = false;
  //       const date = new Date();
  //       data.yearOfManufacture = Math.floor(Math.random() * (1990 - date.getFullYear())) + date.getFullYear();
  //       let randomId = Math.floor(Math.random() * 15);
  //       if (data.id == randomId) data.stock = false; else data.stock = true;
  //     });
  //     console.log(this.productList)
  //     this.cd.markForCheck();
  //   })
  // }
  // getTravel() {
  //   this.shopping = this.product.getTravel().subscribe((res: any) => {
  //     this.productList = res.products;
  //     this.productList.map(data => {
  //       if (data.price > 1000) {
  //         data.worldWideShip = true;
  //       } else data.worldWideShip = false;
  //       const date = new Date();
  //       data.yearOfManufacture = Math.floor(Math.random() * (1990 - date.getFullYear())) + date.getFullYear();
  //       let randomId = Math.floor(Math.random() * 15);
  //       if (data.id == randomId) data.stock = false; else data.stock = true;
  //     });
  //     console.log(this.productList)
  //     this.cd.markForCheck();
  //   })
  // }
  // getNature() {
  //   this.shopping = this.product.getGardun().subscribe((res: any) => {
  //     this.productList = res.products;
  //     this.productList.map(data => {
  //       if (data.price > 1000) {
  //         data.worldWideShip = true;
  //       } else data.worldWideShip = false;
  //       const date = new Date();
  //       data.yearOfManufacture = Math.floor(Math.random() * (1990 - date.getFullYear())) + date.getFullYear();
  //       let randomId = Math.floor(Math.random() * 15);
  //       if (data.id == randomId) data.stock = false; else data.stock = true;
  //     });
  //     console.log(this.productList)
  //     this.cd.markForCheck();
  //   })
  // }
  // getSports() {
  //   this.shopping = this.product.getSports().subscribe((res: any) => {
  //     this.productList = res.products;
  //     this.productList.map(data => {
  //       if (data.price > 1000) {
  //         data.worldWideShip = true;
  //       } else data.worldWideShip = false;
  //       const date = new Date();
  //       data.yearOfManufacture = Math.floor(Math.random() * (1990 - date.getFullYear())) + date.getFullYear();
  //       let randomId = Math.floor(Math.random() * 15);
  //       if (data.id == randomId) data.stock = false; else data.stock = true;
  //     });
  //     console.log(this.productList)
  //     this.cd.markForCheck();
  //   })
  // }
  // getElectric() {
  //   this.shopping = this.product.getElectric().subscribe((res: any) => {
  //     this.productList = res.products;
  //     this.productList.map(data => {
  //       if (data.price > 1000) {
  //         data.worldWideShip = true;
  //       } else data.worldWideShip = false;
  //       const date = new Date();
  //       data.yearOfManufacture = Math.floor(Math.random() * (1990 - date.getFullYear())) + date.getFullYear();
  //       let randomId = Math.floor(Math.random() * 15);
  //       if (data.id == randomId) data.stock = false; else data.stock = true;
  //     });
  //     console.log(this.productList)
  //     this.cd.markForCheck();
  //   })
  // }
  // getChildCare() {
  //   this.shopping = this.product.getChildCare().subscribe((res: any) => {
  //     this.productList = res.products;
  //     this.productList.map(data => {
  //       if (data.price > 1000) {
  //         data.worldWideShip = true;
  //       } else data.worldWideShip = false;
  //       const date = new Date();
  //       data.yearOfManufacture = Math.floor(Math.random() * (1990 - date.getFullYear())) + date.getFullYear();
  //       let randomId = Math.floor(Math.random() * 15);
  //       if (data.id == randomId) data.stock = false; else data.stock = true;
  //     });
  //     console.log(this.productList)
  //     this.cd.markForCheck();
  //   })
  // }
  // getToys() {
  //   this.shopping = this.product.getToys().subscribe((res: any) => {
  //     this.productList = res.products;
  //     this.productList.map(data => {
  //       if (data.price > 1000) {
  //         data.worldWideShip = true;
  //       } else data.worldWideShip = false;
  //       const date = new Date();
  //       data.yearOfManufacture = Math.floor(Math.random() * (1990 - date.getFullYear())) + date.getFullYear();
  //       let randomId = Math.floor(Math.random() * 15);
  //       if (data.id == randomId) data.stock = false; else data.stock = true;
  //     });
  //     console.log(this.productList)
  //     this.cd.markForCheck();
  //   })
  // }
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
  getYear(e: any) {
    console.log(e.split("-"));
    this.selectChipList = e.split("-");
  }
  deliveryOptions(val: any) {
    this.deliveryOption = val;
  }
  getExpandFilter(val: any) {
    if (this.expandFilter.includes(val)) {
      let index = this.expandFilter.indexOf(val)
      this.expandFilter.splice(index, 1);
      if (val == "Price: Low -> High") this.sortBy = ""; else this.sortBy = "";
      return;
    }
    this.expandFilter.push(val);
    if (val == "Price: Low -> High") return this.sortBy = "useless_first"; else return this.sortBy = "useless_second";
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
}
