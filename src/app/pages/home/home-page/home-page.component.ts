import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { NavbarComponent } from "../components/navbar/navbar.component";
import { FooterComponent } from '../components/footer/footer.component';
import { ReviewsComponent } from '../components/reviews/reviews.component';
import { CardReviewComponent } from "../components/card-review/card-review.component";
import { RegisterComponent } from "../../../auth/pages/register/register.component";
import { AboutUsComponent } from '../components/about-us/about-us.component';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, NavbarComponent, FooterComponent,
    ReviewsComponent, CardReviewComponent, RegisterComponent, AboutUsComponent],
  templateUrl: './home-page.component.html'
})
export class HomePageComponent {

}
