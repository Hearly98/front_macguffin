import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, SidebarComponent, CommonModule, RouterOutlet],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  menues=[
    {path:'/admin/dashboard', text:'Dashboard', icon:'/assets/icons/chart_pie.svg'},
    {path:'/admin/peliculas', text: 'Peliculas', icon: '/assets/icons/play_circle.svg'},
    {path:'/admin/generos', text: 'Géneros', icon: '/assets/icons/First_Aid.svg'}
  ]
}
