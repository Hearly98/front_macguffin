import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'c-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor( private router: Router) {}
  @Input() menues?: any[];
  open=false;
  toggleSidebar(){
    this.open=!this.open;
  }
  toggleSubmenu(menu: any) {
    if (menu.submenu) {
      menu.open = !menu.open;
    } else {
      this.navigateTo(menu.path);
    }
  }
  navigateTo(path:string){
    if (path) {
      this.router.navigate([path]);
    }
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.clear()
    this.router.navigate(['/login']);
  }
  
}
