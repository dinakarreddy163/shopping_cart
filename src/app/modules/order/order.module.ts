import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartDetailsComponent } from './cart-details/cart-details.component';
import { Route, RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card'
import { IsAuthGuard } from 'src/app/guards/is-auth.guard';
import { MatButtonModule } from '@angular/material/button';

const route: Routes = [{
  path: 'cart-list',
  component:CartDetailsComponent,canActivate:[IsAuthGuard]
}]

@NgModule({
  declarations: [
    CartDetailsComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterModule.forChild(route)
  ]
})
export class OrderModule { }
