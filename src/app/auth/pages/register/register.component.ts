import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RegisterModel } from '../../models/register';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkWithHref],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  success : boolean = false
  message = ""
  registerModel: RegisterModel = new RegisterModel()
  constructor(
    private authService: AuthService,
    private router : Router
  ){}
  doRegister() {
    this.authService.register(this.registerModel).subscribe({
      next: (response) => {
          // Registro exitoso
          console.log('Registro completado', response);
          this.router.navigate(['/login']);
          this.message = "Registro exitoso";
      },
      error: (error) => {
          if (error.status === 409) {
              this.message = 'El usuario ya existe. Por favor, elige otro nombre de usuario o email.';
          } else {
              this.message = 'Ocurrió un error. Por favor, intenta de nuevo.';
          }
      }
  });
  
  }
  
}
