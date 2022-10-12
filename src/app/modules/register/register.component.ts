import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  register:any;
  constructor() { }

  ngOnInit(): void {
    this.register = new FormGroup({
      firstName:new FormControl('',[Validators.required,Validators.minLength(3)]),
      lastName: new FormControl('',[Validators.required,Validators.minLength(3)]),
      email: new FormControl('',[Validators.required,Validators.email]),
      passwordGroup: new FormGroup({
        password: new FormControl('',[Validators.required,Validators.minLength(8)]),
        confirmPassword: new FormControl('',[Validators.required,Validators.minLength(8)])
      }),
      addressGroup:new FormGroup({
        address1:new FormControl('',[Validators.required]),
        address2:new FormControl('',[Validators.required]),
        country:new FormArray([],[Validators.required]),
        state:new FormArray([],[Validators.required]),
        city:new FormArray([],[Validators.required]),
        zip:new FormControl('',[Validators.required])
      })
    })
    
  }
  registerAccount(){
    console.log(this.register);
  }
}
