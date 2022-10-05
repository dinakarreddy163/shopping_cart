
import { Component, Inject, OnInit,ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
productDetail:any;
  data: any;
  constructor(@Inject(MAT_DIALOG_DATA) data: any) {
    this.productDetail = data;
    console.log(data)
   }

  ngOnInit(): void {
  }

}
