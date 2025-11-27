import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard {
  role = localStorage.getItem('role');

  constructor(private auth: AuthService) {}

  logout() {
    this.auth.logout();
  }
}
