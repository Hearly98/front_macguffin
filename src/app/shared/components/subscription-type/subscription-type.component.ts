import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SuscriptionService } from './services/suscription.service';
import { SuscriptionModel } from './models/suscription.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subscription-type',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subscription-type.component.html',
  styleUrl: './subscription-type.component.css'
})
export class SubscriptionTypeComponent{
  userId: number = 0;

  constructor(private router: Router, private suscriptionService: SuscriptionService) {}
  showModal: boolean = false;

  // Método para abrir el modal
  openModal() {
    this.showModal = true;
  }
  // Método para cerrar el modal
  closeModal() {
    this.showModal = false;
  }

  subscribeNow() {
    console.log('El usuario eligió el plan Premium');
    this.closeModal();
    const subscription: SuscriptionModel = { planName: 'Premium' };
    this.suscriptionService.suscribeUser(this.userId, subscription).subscribe(() => {
      this.router.navigate(['/profile']);
    });
  }

  subscribeLater() {
    console.log('El usuario decidió suscribirse más tarde');
    this.closeModal();
    this.router.navigate(['/login']);
  }
}
