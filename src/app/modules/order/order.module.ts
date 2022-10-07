import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartDetailsComponent } from './cart-details/cart-details.component';
import { Route, RouterModule, Routes } from '@angular/router';

const route: Routes = [{
  path: 'cart-list',
  component:CartDetailsComponent
}]

@NgModule({
  declarations: [
    CartDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ]
})
export class OrderModule { }
