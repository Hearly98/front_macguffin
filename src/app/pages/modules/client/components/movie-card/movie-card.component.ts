import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterLinkWithHref } from '@angular/router';
import { GetMovie } from '../../models/get-movie';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, RouterLinkWithHref],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css'
})
export class MovieCardComponent {
  @Input() movie!: GetMovie;

  onClick(movieId: number) {
    console.log(`Navigating to movie with ID: ${movieId}`);
  }
  
}
