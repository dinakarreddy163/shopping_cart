
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  productDetail: any;
  data: any;
  cartQty:number = 0;
  constructor(@Inject(MAT_DIALOG_DATA) data: any, private app: AppService) {
    this.productDetail = data;
    //console.log(data)
  }

  ngOnInit(): void {
  }
  addToCart() {
    let getVal =0;
    this.app.getValAddToCart().subscribe(e => {
      getVal = e;
    })
    this.app.postValAddToCart(getVal + 1);
    this.productDetail.addToCart = true;
    this.productDetail.qty = this.cartQty;
    let cartList: any[] = [];
    cartList.push(this.productDetail);
    if(localStorage.getItem('cartList')){
      let storedList = localStorage.getItem('cartList');
      storedList = JSON.parse(storedList!);
      // cartList.push(storedList);
      cartList = cartList.concat(storedList);
      // cartList = cartList.filter((e,i)=>{
      //   let getIndex = cartList.findIndex(e.title);
      //   return cartList.indexOf(getIndex)==i;
      // })
    }
    localStorage.setItem('cartList',JSON.stringify(cartList));
  }
  removeToCart()
  {
    let getVal =0;
    this.app.getValAddToCart().subscribe(e => {
      getVal = e;
    })
    this.app.postValAddToCart(getVal - 1);
    this.productDetail.addToCart = false;
    let cartList: any[] = [];
    if(localStorage.getItem('cartList')){
      let storedList = localStorage.getItem('cartList');
      storedList = JSON.parse(storedList!);
      cartList = cartList.concat(storedList);
      cartList = cartList.filter(e=>e.title!=this.productDetail.title);
    }
    localStorage.setItem('cartList',JSON.stringify(cartList));
  }

  addQty(type:any)
  {
    if(type=='add')
    {
      this.cartQty++;
    } else  {
      if(this.cartQty>=0) this.cartQty--;
    }
  }
}
