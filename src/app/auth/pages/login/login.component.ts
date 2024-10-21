import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/login';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{


  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/admin']);
  }
  }
  success: boolean = false;
  message = "";
  loginData :LoginRequest = new LoginRequest()
  constructor(
    private authService: AuthService,
    private router: Router
  ){}
  doLogin() {
    if (this.loginData.username && this.loginData.password) {
        this.message = "Iniciando sesión...";
        this.authService.login(this.loginData).subscribe({
            next: (response) => {
                console.log(response);
                this.message = "¡Login exitoso!";
                this.success = true;
                setTimeout(() => {
                    this.router.navigate(['/movies']);
                }, 3000);
            },
            error: (error) => {
                console.error('Error de login', error);
                    this.message = `Los datos ingresados son incorrectos`;
                this.success = false;
                setTimeout(() => {
                    this.message = "";
                }, 3000);
            }
        });
    } else {
        this.message = "Por favor, ingrese todos los campos requeridos.";
        this.success = false;
        setTimeout(() => {
            this.message = "";
        }, 3000);
    }
}

}
