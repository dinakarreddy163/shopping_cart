import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { LoginComponent } from 'src/app/modules/login/login.component';
import { ProductService } from 'src/app/modules/product/product.service';
import { SignatureComponent } from 'src/app/modules/profile/signature/signature.component';
import { RegisterComponent } from 'src/app/modules/register/register.component';
import data from '../../model/header.json';
import { headerIcons } from '../../model/headerNav'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  headerIcons: headerIcons[] = data;
  constructor(private app: AppService, private matDialog: MatDialog, private route: Router, public router: ActivatedRoute, private matSnackBar: MatSnackBar) { }
  watchList: number = 0;
  searchValue: any;
  options: any[] = [];
  filteredOptions: Observable<any[]> | undefined;
  cartValue: any;
  isAuth: any;
  ngOnInit(): void {
    //console.log(this.headerIcons);
    this.searchData();
    this.getWatchList();
    this.getCart();
    this.isAuth = localStorage.getItem("isLogin");
  }


  iconActive(data: any) {
    this.headerIcons.map(e => e.active = false);
    data.active = true;
  }
  getWatchList() {
    this.app.getVal().subscribe((data: any) => {
      this.watchList = data.length;
    })
  }
  signIn() {
    debugger
    const signIn = this.matDialog.open(LoginComponent);
    signIn.afterClosed().subscribe(e => {
      if (e) {
        this.isAuth = e;
      }
    })
  }
  onClickRouter(routerLink: any) {
    this.reloadComponent(routerLink);
  }
  reloadComponent(routerLink: any) {
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;
    this.route.onSameUrlNavigation = 'reload';
    this.route.navigate([routerLink]);
  }
  searchData() {
    let set = this.app.searchResult();
    //console.log(set)
  }
  getVal(e: any) {
    this.app.postValSearch(e.source.value);
  }
  getCart() {
    this.app.getValAddToCart().subscribe(e => {
      this.cartValue = e;
    })
    let cartDetail = JSON.parse(localStorage.getItem('cartList')!);
    this.cartValue =  cartDetail.length;
  }
  signOut() {
    this.isAuth = "false";
    localStorage.clear();
  }
  getMyCart() {
    if (this.isAuth != "true") this.matSnackBar.open("Please sign in to application", "Close");
    this.route.navigate(["order/cart-list"]);
  }
  getWatch() {
    this.route.navigate(["order/watch-list"]);
  }
  search(e: Event) {
    this.app.setSearch(this.searchValue);
  }
  regiter() {
    this.matDialog.open(RegisterComponent);
  }
  select(val: any) {
    if (val == 'Signature') {
      const signIn = this.matDialog.open(SignatureComponent);
    }
  }
}
