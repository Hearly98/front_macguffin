import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SuscriptionService } from '../../../../../shared/components/subscription-type/services/suscription.service';
import { SuscriptionModel } from '../../../../../shared/components/subscription-type/models/suscription.model';
import { UserProfileModel } from './models/client.model';
import { ClientService } from './services/client.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  userId: number = 0;
  userData: UserProfileModel | null = null;
  subscriptionStatus: string = "";

  constructor(
    private routing: Router,
    private router: ActivatedRoute,
    private clientService: ClientService,
    private subscriptionService: SuscriptionService
  ) {}

  ngOnInit(): void {
    const username = localStorage.getItem('username'); // Obtén el username del token almacenado
    if (username) {
      this.loadUserData(username);
      // Cargar el estado de la suscripción desde localStorage
      this.subscriptionStatus = localStorage.getItem('subscriptionStatus') || 'sin suscripción';
    }
  }
  
  loadUserData(username: string) {
    this.clientService.getUserByUsername(username).subscribe({
      next: (user) => {
        this.userData = user;
        this.userId = user.idUsuario;
        console.log(this.userId);
        console.log(this.userData);
        
        // Llama a checkSubscription después de que se haya asignado el userId
        this.checkSubscription();
      },
      error: (error) => {
        console.error('Error al cargar los datos del usuario', error);
      }
    });
  }

  checkSubscription() {
    if (this.userId) {
        this.subscriptionService.hasActiveSubscription(this.userId).subscribe({
            next: (response) => {
                const message = response.message; // Ahora esto debería funcionar
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





  subscribeNow() {
    const subscription: SuscriptionModel = { planName: 'Plan Premium' };
    this.subscriptionService.suscribeUser(this.userId, subscription).subscribe(() => {
      this.subscriptionStatus = 'activa';
      localStorage.setItem('subscriptionStatus', this.subscriptionStatus);
    });
  }
  
  logout() {
    localStorage.removeItem('token');
    localStorage.clear();
    this.routing.navigate(['/login']);
  }
}
