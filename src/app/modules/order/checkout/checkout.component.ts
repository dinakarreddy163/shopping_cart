import { Component, OnInit } from '@angular/core';
import { generatePdf } from 'src/app/model/printPdf';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkOrder: boolean = false;
  addressCheck: boolean = false;
  constructor() { }

  ngOnInit(): void {
    fetch("hi").then(e => {
      console.log(e)
    })
  }

  getOrder(e: any) {
    this.checkOrder = e;
  }
  orderSubmit() {
    // this.readTextFile("file:///C:/Users/DGOPAVAR/Downloads/formData.txt");
    generatePdf();
  }
  readTextFile(file: any) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
      if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status == 0) {
          var allText = rawFile.responseText;
          alert(allText);
        }
      }
    }
    rawFile.send(null);
  }
  getAddress(val:any)
  {
    this.addressCheck = val;
  }
}
