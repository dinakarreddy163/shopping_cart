import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  address: any;
  cardList:any[]=[];
  panelOpenState: boolean = false;
  panelOpenStateCard: boolean = true;

  @Output() addAddress = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    this.address = new FormGroup({
      name: new FormControl('', [Validators.required]),
      address1: new FormControl('', [Validators.required]),
      address2: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      zip: new FormControl('', [Validators.required])
    })
  }
  f() {
    return this.address.controls;
  }
  add()
  {
    this.cardList.push({
      "addressName":this.address.value.name
    });
    this.address.reset();
  }
  addressCheck(e:any)
  {
    this.addAddress.emit(true);
  }
}
