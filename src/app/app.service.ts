import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class AppService {
 public behaviourSubject = new BehaviorSubject(0);
  constructor() { }

  postVal(val:any)
  {
    this.behaviourSubject.next(val);
  }

  getVal()
  {
   return this.behaviourSubject.asObservable();
  }
}
