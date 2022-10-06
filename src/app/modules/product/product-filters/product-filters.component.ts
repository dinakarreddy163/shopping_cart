import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product-filters',
  templateUrl: './product-filters.component.html',
  styleUrls: ['./product-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFiltersComponent implements OnInit {
  panelOpenState: boolean = true;
  expandedFilters: any[] = [];
  yearOfManufacture: any[] = []
  constructor() { }
  @Input() name = "";
  @Output() year = new EventEmitter<any>;
  @Output() expand = new EventEmitter<any>;
  ngOnInit(): void {
    this.expandedFilters = [{
      name: "Recommended"
    },
    {
      name: "Recently Added"
    },
    {
      name: "Expiring Soon"
    },
    {
      name: "Most Rated"
    },
    {
      name: "Price: Low -> High"
    },
    {
      name: "Price: High -> Low"
    }
    ]
    for (let i = 1990; i < new Date().getFullYear(); i += 10) {
      this.yearOfManufacture.push({ name: i })
    }
    let array = [];
    for (let i = 0; i < this.yearOfManufacture.length; i++) {
      for (let j = i + 1; j < this.yearOfManufacture.length; j++) {
        array.push(`${this.yearOfManufacture[i].name}-${this.yearOfManufacture[j].name}`);
        break;
      }
    }
    this.yearOfManufacture = array;
  }
  sortByYear(val: any) {
    this.year.emit(val)
  }
  expandFliter(val:any)
  {
    this.expand.emit(val.name);
  }
}
