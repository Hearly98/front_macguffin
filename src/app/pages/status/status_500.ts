import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-status_404',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div class="text-center">
      <h1>404</h1>
      <span>Ops...</span>
      <p>No se escontró la página</p>
    </div>
  `,
})
export class status_404_Component {
  title = 'status_404';
}
