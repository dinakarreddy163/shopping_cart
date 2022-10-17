import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordValidation } from 'src/app/model/validation';

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
        password: new FormControl('',[Validators.required,Validators.minLength(8),passwordValidation]),
        confirmPassword: new FormControl('',[Validators.required,Validators.minLength(8),passwordValidation])
      }),
      addressGroup:new FormGroup({
        address1:new FormControl('',[Validators.required]),
        address2:new FormControl('',[Validators.required]),
        country:new FormControl([],[Validators.required]),
        state:new FormControl([],[Validators.required]),
        city:new FormControl([],[Validators.required]),
        zip:new FormControl('',[Validators.required])
      })
    })
    
  }
  registerAccount(){
    console.log(this.register);
  }
}
