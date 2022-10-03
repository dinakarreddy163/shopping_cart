import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import entertainment from '../../model/entertainment.json';
import cloths from '../../model/cloths.json';
import { of } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  getProducts() {
    // return this.http.get("https://dummyjson.com/products");
    return of(cloths);
  }
  getMovies()
  {
   return of(entertainment);
  }
}
