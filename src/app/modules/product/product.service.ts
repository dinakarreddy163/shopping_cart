import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import entertainment from '../../model/entertainment.json';
import cloths from '../../model/cloths.json';
import music from '../../model/music.json';
import pets from '../../model/pets.json';
import kitchen from '../../model/kitchen.json';
import travel from '../../model/travel.json';
import gardun from '../../model/garden.json';
import sports from '../../model/sports.json';
import electric from '../../model/electricTools.json';
import childCare from '../../model/motherCare.json';
import toys from '../../model/toys.json';
import { map, of } from 'rxjs'
import { AppService } from 'src/app/app.service';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private app: AppService) { }
  getProducts(pageName: string) {

    // returnreturn this.http.get("https://dummyjson.com/products");
    if (pageName == 'local_movies') {
      return this.getMovies();
    }
    else if (pageName == 'library_music') {
      return this.getMusic();
    }
    else if (pageName == 'pets') {
      return this.getPets();
    }
    else if (pageName == 'kitchen') {
      return this.getKitchen();
    }
    else if (pageName == 'card_travel') {
      return this.getTravel();
    }
    else if (pageName == 'nature') {
      return this.getGardun();
    }
    else if (pageName == 'sports') {
      return this.getSports();
    }
    else if (pageName == 'electric_bolt') {
      return this.getElectric();
    }
    else if (pageName == 'child_care') {
      return this.getChildCare();
    }
    else if (pageName == 'toys') {
      return this.getToys();
    }
    else {
      return of(cloths);
    }

   
  }
  getMovies() {
    return of(entertainment);
  }
  getMusic() {
    return of(music);
  }
  getPets() {
    return of(pets);
  }
  getKitchen() {
    return of(kitchen);
  }
  getTravel() {
    return of(travel);
  }
  getGardun() {
    return of(gardun);
  }
  getSports() {
    return of(sports);
  }
  getElectric() {
    return of(electric);
  }
  getChildCare() {
    return of(childCare);
  }
  getToys() {
    return of(toys);
  }
  searchResult() {
    return [...cloths.products, ...toys.products, ...entertainment.products, ...music.products, ...pets.products, ...kitchen.products
      , ...travel.products, ...gardun.products, ...sports.products, ...electric.products, ...childCare.products]
  }

  getCal(productList:any[])
  {
     return  productList.map(e => {
        let discountAmt = (parseFloat(e.discountPercentage) * parseFloat(e.price)) / 100;
        e.finalAmt = e.price - discountAmt;
      })
  }
}
