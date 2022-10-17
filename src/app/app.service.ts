import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, ReplaySubject, Observable } from 'rxjs';
import entertainment from './model/entertainment.json';
import cloths from './model/cloths.json';
import music from './model/music.json';
import pets from './model/pets.json';
import kitchen from './model/kitchen.json';
import travel from './model/travel.json';
import gardun from './model/garden.json';
import sports from './model/sports.json';
import electric from './model/electricTools.json';
import childCare from './model/motherCare.json';
import toys from './model/toys.json';
import { PreloadAllModules, Route } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AppService implements PreloadAllModules {
  public behaviourSubject = new BehaviorSubject(0);
  public behaviourSubjectCart = new BehaviorSubject(0);
  public behaviourSubjectSearch = new Subject();
  public replaySubject = new ReplaySubject();
  public seachValue = new BehaviorSubject<string>('');
  constructor() { }
  preload(route: Route, fn: () => Observable<any>):any {
    console.log(route)
  }

  postVal(val: any) {
    this.behaviourSubject.next(val);
  }

  getVal() {
    return this.behaviourSubject.asObservable();
  }
  searchResult() {
    return [...cloths.products, ...toys.products, ...entertainment.products, ...music.products, ...pets.products, ...kitchen.products
      , ...travel.products, ...gardun.products, ...sports.products, ...electric.products, ...childCare.products]
  }
  postValSearch(val: any) {
    this.behaviourSubjectSearch.next(val);
  }

  getValSearch() {
    return this.behaviourSubjectSearch.asObservable();
  }
  postValAddToCart(val: any) {
    this.behaviourSubjectCart.next(val);
  }

  getValAddToCart() {
    return this.behaviourSubjectCart.asObservable();
  }
  postCart(val:any)
  {
    this.replaySubject.next(val);
  }
  getCart()
  {
   return this.replaySubject.asObservable();
  }
  setSearch(val:string)
  {
    this.seachValue.next(val)
  }
  getSearch()
  {
    return this.seachValue.asObservable();
  }

}
