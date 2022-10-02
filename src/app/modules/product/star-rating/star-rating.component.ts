import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class StarRatingComponent implements OnInit {
  starsShow: any[] = [];
  @Input() starRating: any;
  @Input() layOut: any;
  
  constructor() { }

  ngOnInit(): void {
    for (let i = 1; i < 6; i++) {
      this.starsShow.push(i);
    }
  }
  getRating(i: any) {
    if (this.starRating >= i)
      return "star"
    else
      return "star_border"
  }
}
