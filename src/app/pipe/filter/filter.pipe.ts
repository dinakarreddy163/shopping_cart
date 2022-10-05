import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(productList: any[], value:any,deliveryOption:any,expandFilter:any) {
    console.log(typeof value);
    if(value == "world_wide_ship") return productList.filter(e=>e.worldWideShip==true);
    if(value == "under_50") return productList.filter(e=>e.price<=700);
    if(value == "Jeans") return productList.filter(e=>e.category=='Mens_jeans');
    if(value == "pucker_shoes") return productList.filter(e=>e.category=='Mens_Shoes');
    // if(value.length!=0) {
    //   let list = productList;
    //   value.forEach((e:any,i:number) => {
    //     value.forEach((e:any,j:number) => {
    //    list = productList.filter(e=>{e.yearOfManufacture>=value[i] && e.yearOfManufacture<=value[j+1]});
    //     })
    //   });
    //    return list
    // }
    if(deliveryOption!="")
    {
      if(deliveryOption=="pay_on_del") return productList.filter(e=>e.price <=800 );
      if(deliveryOption=="online_pay") return productList.filter(e=>e.price >=800 );
      else return productList;
    }
    // if(expandFilter?.length!=0)
    // {
    //   let filterData:any = [];
    //   // filterData=productList;
    //   expandFilter.forEach((res:any) => {
    //     if(res=="Recommended") filterData= productList.filter((e:any)=>e.rating<4.5);
    //     if(res=="Expiring Soon") filterData= productList.filter((e:any)=>e.rating<2010);
    //     if(res=="Recently Added") filterData= productList.filter((e:any)=>e.rating>1990);
    //     // switch (res) {
    //     //   case "Recommended":
    //     //     filterData = productList.filter((e:any)=>e.rating==4.5);
    //     //     break;
    //     //   case "Expiring Soon":
    //     //     filterData.filter((e:any)=>e.rating<4.69);
    //     //     break;
    //     //   case "Recently Added":
    //     //     filterData.filter((e:any)=>e.rating==4.69);
    //     //     break;
    //     //   default:
    //     //     break;
    //     // }
    //   });
    //   return filterData
    // }
    else return productList
  }

}
