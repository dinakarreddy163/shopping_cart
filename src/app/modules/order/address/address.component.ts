import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  address:any;
  constructor() { }

  ngOnInit(): void {
    this.address = new FormGroup({
      address1:new FormControl('',[Validators.required]),
      address2:new FormControl('',[Validators.required]),
      country:new FormArray([],[Validators.required]),
      state:new FormArray([],[Validators.required]),
      city:new FormArray([],[Validators.required]),
      zip:new FormControl('',[Validators.required])
    })
  }

}
