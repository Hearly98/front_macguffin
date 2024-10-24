import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-navbar-movie',
  standalone: true,
  imports: [RouterLink, RouterLinkWithHref],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponentMovie {
  constructor(private router: Router) {}

  navigateToProfile() {
    this.router.navigate(['/movies/profile']);
  }
}
