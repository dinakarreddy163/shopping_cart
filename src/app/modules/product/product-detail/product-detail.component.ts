
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
  }
  removeToCart()
  {
    let getVal =0;
    this.app.getValAddToCart().subscribe(e => {
      getVal = e;
    })
    this.app.postValAddToCart(getVal - 1);
    this.productDetail.addToCart = false;
  }
}
