import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Movie } from '@admin/modules/movies/models/movie';
import { MovieService } from '@admin/modules/movies/services/movie.service';
import { SuscriptionService } from '../../../../../shared/components/subscription-type/services/suscription.service';
import { SubscriptionResponse } from '../../../../../shared/components/subscription-type/models/subscription-response.model';
import { CommonModule } from '@angular/common';
import { UserProfileModel } from '../profile/models/client.model';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent {
  userId: number = 0;
  userData: UserProfileModel | null = null;
  subscriptionStatus: string = "";
  movie = signal<Movie | null>(null);
  cover = signal('');
  videoUrl = signal<SafeResourceUrl | null>(null);
  showModal = signal(false);
  private movieService = inject(MovieService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private sanitizer = inject(DomSanitizer);
  private subscriptionService = inject(SuscriptionService);

  private setVideoUrl(url: string) {
    this.videoUrl.set(this.sanitizer.bypassSecurityTrustResourceUrl(url));
  }

  ngOnInit() {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      this.userId = +storedUserId;
    }

    this.route.params.subscribe(params => {
      const movieId = +params['id'];
      this.loadMovie(movieId);
    });
  }

  private loadMovie(movieId: number) {
    this.movieService.getMovieById(movieId).subscribe({
      next: (movie) => {
        this.movie.set(movie);
        const videoUrl = movie.movie_Url;

        if (videoUrl) {
          const videoId = this.extractVideoId(videoUrl.trim());
          if (videoId) {
            this.setVideoUrl(`https://www.youtube.com/embed/${videoId}`);
          } else {
            console.error('No video ID found in the URL:', videoUrl);
          }
        } else {
          console.error('No video URL found for the movie:', movie);
        }

        this.checkSubscription();
      },
      error: (error) => {
        console.error('Error loading movie:', error);
      }
    });
  }

  checkSubscription() {
    if (this.userId) {
        this.subscriptionService.hasActiveSubscription(this.userId).subscribe({
            next: (response) => {
                const message = response.message;
                if (message === 'El usuario tiene una suscripción activa.') {
                    this.subscriptionStatus = 'activa';
                } else if (message === 'El usuario tiene una suscripción inactiva.') {
                    this.subscriptionStatus = 'inactiva';
                } else {
                    this.subscriptionStatus = 'sin suscripción';
                }
                localStorage.setItem('subscriptionStatus', this.subscriptionStatus);
            },
            error: (error) => {
                console.error('Error al verificar la suscripción', error);
                this.subscriptionStatus = 'sin suscripción';
            }
        });
    } else {
        console.error('El userId no es válido');
        this.subscriptionStatus = 'sin suscripción';
    }
  }

  private extractVideoId(url: string | undefined): string | undefined {
    if (!url) return undefined;
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n]{11})/);
    return match ? match[1] : undefined;
  }

  changeCover(newImg: string) {
    this.cover.set(newImg);
  }

  get movieDetails(): Movie | null {
    return this.movie();
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }
}
