import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(productList: any[], value:any) {
    if(value == "useless_first") return productList.sort((a,b)=>a.price-b.price);
    if(value == "useless_second") return productList.sort((a,b)=>b.price-a.price);
    else return productList
  }

}
