import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
  constructor(
    private router: Router
  ){}
doLogin(){
  setTimeout(() => {
    this.router.navigate(['/admin']);
  }, 2000);
  console.log("inicio de sesión exitoso");
}
}
