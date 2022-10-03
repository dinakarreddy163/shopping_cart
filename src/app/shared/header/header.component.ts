import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { LoginComponent } from 'src/app/modules/login/login.component';
import data from '../../model/header.json';
import { headerIcons } from '../../model/headerNav'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  headerIcons: headerIcons[] = data;
  constructor(private app: AppService,private matDialog:MatDialog,private route:Router,public router:ActivatedRoute) { }
  watchList: number = 0;
  ngOnInit(): void {
    console.log(this.headerIcons);
    this.getWatchList();
  }
  iconActive(data: any) {
    this.headerIcons.map(e => e.active = false);
    data.active = true;
  }
  getWatchList() {
    this.app.getVal().subscribe(data => {
      this.watchList = data;
    })
  }
  signIn() {
    this.matDialog.open(LoginComponent,{
      width:'250px'
    })
  }
  onClickRouter(routerLink:any)
  {
    this.reloadComponent(routerLink);
  }
  reloadComponent(routerLink:any) {
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;
    this.route.onSameUrlNavigation = 'reload';
    this.route.navigate([routerLink]);
  }
}
