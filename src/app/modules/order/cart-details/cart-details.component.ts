import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from '../../product/product.service';
import { CheckoutComponent } from '../checkout/checkout.component';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss'],
  providers: [ProductService]
})
export class CartDetailsComponent implements OnInit {
  productList: any[] = [];
  totalAmt: number = 0.00;
  discountAmt: number = 0.00;
  constructor(private model: MatDialog) { }

  ngOnInit(): void {
    this.getProduct();
  }
  getProduct() {
    this.productList = JSON.parse(localStorage.getItem('cartList')!);
    this.productList.map(e => {
      let discountAmt = (parseFloat(e.discountPercentage) * parseFloat(e.price)) / 100;
      e.finalAmt = e.price - discountAmt;
      this.discountAmt = this.discountAmt + discountAmt;
    })
    this.productList.forEach((val: any) => {
      this.totalAmt = this.totalAmt + val.price;
    })
  }
  deleteProduct(list: any) {
    this.productList = this.productList.filter(e => e.title != list.title);
    // localStorage.setItem('cartList',JSON.stringify(this,this.productList));
  }
  checkOut() {
    this.model.open(CheckoutComponent);
  }
}
