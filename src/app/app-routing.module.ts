import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './shared/error-page/error-page.component';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./modules/product/product.module').then(e => e.ProductModule)
  },
  {
    path: 'order', loadChildren: () => import('./modules/order/order.module').then(e => e.OrderModule)
  },
  {
    path: "**", component: ErrorPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
