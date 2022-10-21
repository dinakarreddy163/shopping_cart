import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordValidation } from 'src/app/model/validation';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  register:any;
  constructor(private registerS:RegisterService) { }

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
        country:new FormControl('',[Validators.required]),
        state:new FormControl('',[Validators.required]),
        city:new FormControl('',[Validators.required]),
        zip:new FormControl('',[Validators.required])
      })
    })
    
  }
  registerAccount(){
    
    let registrationDTO={
      "id":0,
      "firstName":this.register.value.firstName,
      "lastName":this.register.value.lastName,
      "email":this.register.value.email,
      "password":this.register.value.passwordGroup.password,
      "confirmPassword":this.register.value.passwordGroup.confirmPassword,
      "address1":this.register.value.addressGroup.address1,
      "address2":this.register.value.addressGroup.address2,
      "state":this.register.value.addressGroup.state,
      "contry":this.register.value.addressGroup.contry,
      "city":this.register.value.addressGroup.city,
    }
    this.registerS.register(registrationDTO).subscribe(e=>{

    })
    console.log(this.register);
  }
}
