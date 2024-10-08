import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-review',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-review.component.html',
  styleUrl: './card-review.component.css'
})
export class CardReviewComponent {
@Input() title: string = "";
@Input() review: string = "";
@Input() rating: number = 0;
@Input() img: string = ""
getStarArray(){
 return new Array(Math.floor(this.rating));
}
}
