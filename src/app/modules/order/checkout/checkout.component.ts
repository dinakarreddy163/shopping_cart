import { Component, OnInit } from '@angular/core';
import { generatePdf } from 'src/app/model/printPdf';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkOrder: boolean = false;
  constructor() { }

  ngOnInit(): void {
    generatePdf();
  }

  getOrder(e: any) {
    this.checkOrder = e;
  }
}
