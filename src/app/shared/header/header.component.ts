import { Component, OnInit } from '@angular/core';
import data from '../../model/header.json';
import {headerIcons} from '../../model/headerNav'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
 headerIcons:headerIcons[]=data;
  constructor() { }

  ngOnInit(): void {
    console.log(this.headerIcons)
  }
  iconActive(data:any)
  {
    this.headerIcons.map(e=>e.active=false);
    data.active=true;
  }
}
