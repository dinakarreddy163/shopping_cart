import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { LoginComponent } from 'src/app/modules/login/login.component';
import { ProductService } from 'src/app/modules/product/product.service';
import data from '../../model/header.json';
import { headerIcons } from '../../model/headerNav'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  headerIcons: headerIcons[] = data;
  constructor(private app: AppService, private matDialog: MatDialog, private route: Router, public router: ActivatedRoute) { }
  watchList: number = 0;
  myControl = new FormControl('');
  options: any[] = ["one"];
  filteredOptions: Observable<any[]> | undefined;
  cartValue:any;
  ngOnInit(): void {
    //console.log(this.headerIcons);
    this.searchData();
    this.getWatchList();
    this.getCart();
    this.options = this.app.searchResult();
    // this.options.map(e=>e.title=`${e.title}-${e.description}`)
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    //console.log(this.filteredOptions)
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.title.toLowerCase(filterValue));
  }

  iconActive(data: any) {
    this.headerIcons.map(e => e.active = false);
    data.active = true;
  }
  getWatchList() {
    this.app.getVal().subscribe(data => {
      this.watchList = data;
    })
  }
  signIn() {
    this.matDialog.open(LoginComponent, {
      width: '250px'
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
    //console.log(e);
    this.app.postValSearch(e.source.value);
  }
  getCart()
  {
    this.app.getValAddToCart().subscribe(e=>{
      this.cartValue = e;
    })
  }
}
