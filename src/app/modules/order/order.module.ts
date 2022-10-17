import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartDetailsComponent } from './cart-details/cart-details.component';
import { Route, RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card'
import { IsAuthGuard } from 'src/app/guards/is-auth.guard';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { CheckoutComponent } from './checkout/checkout.component';
import { WatchListComponent } from './watch-list/watch-list.component';
import { StarRatingComponent } from '../product/star-rating/star-rating.component';
import { ProductModule } from '../product/product.module';
import { AddressComponent } from './address/address.component';
import { ReactiveFormsModule } from '@angular/forms';
import {  MatExpansionModule } from '@angular/material/expansion';
import { PaymentOptionsComponent } from './payment-options/payment-options.component';
import { MatRadioModule } from '@angular/material/radio'

const route: Routes = [{
  path: 'cart-list',
  component: CartDetailsComponent, canActivate: [IsAuthGuard]
},
{
  path: 'watch-list',
  component: WatchListComponent,title:'Order'
}]

@NgModule({
  declarations: [
    CartDetailsComponent,
    CheckoutComponent,
    WatchListComponent,
    AddressComponent,
    PaymentOptionsComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterModule.forChild(route),
    HttpClientModule,
    MatIconModule,
    MatStepperModule,
    ProductModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatRadioModule
  ],

})
export class OrderModule { }
