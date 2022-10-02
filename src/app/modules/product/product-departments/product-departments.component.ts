import {NestedTreeControl} from '@angular/cdk/tree';
import { AfterViewInit, ChangeDetectorRef } from '@angular/core';
import {Component,OnInit} from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import data from '../../../model/departments.json';
interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = data;

@Component({
  selector: 'app-product-departments',
  templateUrl: './product-departments.component.html',
  styleUrls: ['./product-departments.component.scss']
})
export class ProductDepartmentsComponent implements OnInit,AfterViewInit {
  treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<FoodNode>();

  constructor(private cdr : ChangeDetectorRef) {
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
}
