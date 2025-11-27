import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  errorMessage: string = '';   // ⬅⬅⬅ AQUI ESTABA EL PROBLEMA

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        console.log("RES LOGIN:", res);

        localStorage.setItem('token', res.accessToken);
        localStorage.setItem('role', res.roles[0]);
        localStorage.setItem('companyId', res.companyId);

        this.router.navigate(['/procesos']);
      },
      error: () => {
        this.errorMessage = "Credenciales incorrectas";
      }
    });
  }
}
