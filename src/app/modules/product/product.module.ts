import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ProductDepartmentsComponent } from './product-departments/product-departments.component';
import { ProductFiltersComponent } from './product-filters/product-filters.component';
import { Route, RouterModule, Routes } from '@angular/router';
import { MatCardModule} from '@angular/material/card';
import { MatTreeModule} from '@angular/material/tree'
import { MatIconModule } from '@angular/material/icon';
import {MatNativeDateModule} from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './product.service';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FilterPipe } from 'src/app/pipe/filter/filter.pipe';
import { SortPipe } from 'src/app/pipe/sort/sort.pipe';


const route:Routes=[{
  path:'shopping/:name',component:ShoppingListComponent
}]

@NgModule({
  declarations: [
    ShoppingListComponent,
    ProductDepartmentsComponent,
    ProductFiltersComponent,
    StarRatingComponent,
    FilterPipe,
    SortPipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    MatCardModule,
    MatTreeModule,
    MatIconModule,
    MatNativeDateModule,
    HttpClientModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatSelectModule,
    MatChipsModule,
    MatExpansionModule,
    MatCheckboxModule
    
  ],
  providers:[ProductService]
})
export class ProductModule { }
