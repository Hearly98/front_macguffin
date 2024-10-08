import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-status_404',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <span>Ops...</span>
    <h1>No se escontró la página</h1>
  `,
})
export class status_404_Component {
  title = 'status_404';
}
