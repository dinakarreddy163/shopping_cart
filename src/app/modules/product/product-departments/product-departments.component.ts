import {NestedTreeControl} from '@angular/cdk/tree';
import { AfterViewInit, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import {Component,OnInit} from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import { Router } from '@angular/router';
import data from '../../../model/departments.json';
interface FoodNode {
  name: string;
  icon_name?: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = data;

@Component({
  selector: 'app-product-departments',
  templateUrl: './product-departments.component.html',
  styleUrls: ['./product-departments.component.scss']
})
export class ProductDepartmentsComponent implements OnInit,AfterViewInit {
  @Output() shopingList = new EventEmitter();
  treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<FoodNode>();

  constructor(private cdr : ChangeDetectorRef,private route : Router) {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;

  ngOnInit(): void {
    // this.treeControl.expandAll()
  }
  ngAfterViewInit() {
    const referenceToNode = this.dataSource.data.find(d => d.name === 'Electronics')

  // this.treeControl.expand('Electronics');
  }
  onClick(node:any){
   this.reloadComponent(node.routerLink);
  }
  reloadComponent(routerLink: any) {
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;
    this.route.onSameUrlNavigation = 'reload';
    this.route.navigate([routerLink]);
  }
  getCloths(node:String)
  {
    this.shopingList.emit(node);
  }
}
