import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.scss']
})
export class WatchListComponent implements OnInit {
  productList:any[]= [];
  constructor(private app:AppService) { }

  ngOnInit(): void {
    this.getWatchList()
  }
  getWatchList()
  {
    this.app.getVal().subscribe((data:any)=>{
      this.productList = data;
    })
  }
}
