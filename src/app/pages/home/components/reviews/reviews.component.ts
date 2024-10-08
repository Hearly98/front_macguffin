import { Component, Output } from '@angular/core';
import { CardReviewComponent } from '../card-review/card-review.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CardReviewComponent, CommonModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent {

listReview = [
    {title: "John Smith", rating: 5, review: "¡La selección es fantástica y la entrega instantánea cambia las reglas del juego!", img: "/assets/images/review_1.png"},
    {title: "Jane Doe", rating: 4, review: "MacGuffin hizo que fuera muy fácil encontrar y comprar mis películas favoritas. ¡Muy recomendable!", img: "/assets/images/review_2.png"}
  ]
}
