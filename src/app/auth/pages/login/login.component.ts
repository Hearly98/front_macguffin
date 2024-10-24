import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/login';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  success: boolean = false;
  message = "";
  loginData: LoginRequest = new LoginRequest();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      const userRole = localStorage.getItem('userRole');
      if (userRole === 'Admin') {
        this.router.navigate(['/admin']);
      } else if (userRole === 'Cliente') {
        this.router.navigate(['/movies']);
      }
    }
  }
  
  doLogin() {
    if (this.loginData.username && this.loginData.password) {
      this.message = "Iniciando sesión...";
      this.authService.login(this.loginData).subscribe({
        next: (response) => {
          console.log(response);
          localStorage.setItem('token', response.token); // Guarda el token en localStorage
          
          // Decodifica el token
          const decodedToken: any = jwtDecode(response.token);
          const username = decodedToken.sub; // Obtén el username del token

          // Solicita los datos del usuario
          this.authService.getUserByUsername(username).subscribe({
            next: (userData) => {
              // Guarda los datos relevantes en localStorage
              localStorage.setItem('userId', userData.idUsuario.toString());
              localStorage.setItem('userRole', userData.roles.nombreRol); // Guarda solo el nombre del rol
              localStorage.setItem('username', userData.usuario.toString());
              // Redirecciona según el rol
              if (userData.roles.nombreRol === 'Admin') {
                this.router.navigate(['/admin']);
              } else {
                this.router.navigate(['/movies']);
              }

              this.message = "¡Login exitoso!";
              this.success = true;
            },
            error: (error) => {
              console.error('Error al obtener los datos del usuario', error);
              this.message = 'Error al obtener los datos del usuario';
              this.success = false;
            }
          });
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
