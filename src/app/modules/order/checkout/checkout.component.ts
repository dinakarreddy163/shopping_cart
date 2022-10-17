import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkOrder:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  getOrder(e:any)
  {
    this.checkOrder = e;
  }
}
