import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { NavbarComponent } from "../components/navbar/navbar.component";
import { FooterComponent } from '../components/footer/footer.component';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './home-page.component.html'
})
export class HomePageComponent {

}
