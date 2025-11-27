import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://backend.10.43.103.143.nip.io/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }

  saveSession(token: string, role: string, companyId: number | null) {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('companyId', companyId ? companyId.toString() : '');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
