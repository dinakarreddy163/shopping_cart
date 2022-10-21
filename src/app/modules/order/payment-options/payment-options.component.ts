import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment-options',
  templateUrl: './payment-options.component.html',
  styleUrls: ['./payment-options.component.scss']
})
export class PaymentOptionsComponent implements OnInit {
  panelOpenState: boolean = false;
  constructor() { }
  cardDetails: any;
  cardList: any[] = [];
  panelOpenStateCard: boolean = true;
  @Output() orderCheckout: any = new EventEmitter();
  ngOnInit(): void {
    this.cardDetails = new FormGroup({
      cardNumber: new FormControl("", [Validators.required]),
      cardName: new FormControl("", [Validators.required]),
      expiryDate: new FormControl("", [Validators.required]),
      CVV: new FormControl("", [Validators.required, Validators.minLength(3)]),
    });
  }
  getDate(e: any) {
    const expdate = e.target.value;
    const expDateFormatter = expdate.replace(/\//g, "").substring(0, 2) +
      (expdate.length > 2 ? '/' : '') +
      expdate.replace(/\//g, "").substring(2, 4);
    this.cardDetails.controls.expiryDate.setValue(expDateFormatter);
  }
  addCard() {
    console.log(this.cardDetails);
    this.cardList.push({
      "cardNumber": this.cardDetails.value.cardNumber,
      "cardName": this.cardDetails.value.cardName,
      "expiryDate": this.cardDetails.value.expiryDate,
      "CVV": this.cardDetails.value.CVV,
    });
    this.cardDetails.reset();
  }
  payment(e: any) {
    console.log(e);
    this.orderCheckout.emit(true);
  }
}
