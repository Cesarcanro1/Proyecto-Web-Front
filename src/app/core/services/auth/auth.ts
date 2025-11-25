import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Usuario } from '../../models/usuario.interface';
import { Token } from '../../models/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = 'http://backend.10.43.103.143.nip.io/auth/login';

  constructor(private http: HttpClient) {}

  login(credentials: { correo: string; contrasena: string }): Observable<Token> {
    return this.http.post<Token>(this.apiUrl, credentials).pipe(
      tap(response => {
        if (response?.token) {
          localStorage.setItem('jwt_token', response.token);

          const user = this.decodeUserFromToken(response.token);
          if (user) {
            localStorage.setItem('usuario', JSON.stringify(user));
          }
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('usuario');
  }

  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  getUsuario(): Usuario | null {
    const usuarioStr = localStorage.getItem('usuario');
    return usuarioStr ? JSON.parse(usuarioStr) : null;
  }

  getUserInfo(): any {
    const token = this.getToken();
    return token ? this.decodeUserFromToken(token) : null;
  }

  // ⬇️⬇️⬇️ ESTA ES LA PARTE IMPORTANTE
  getAuthHeaders(): HttpHeaders {
    const token = this.getToken() ?? '';
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // ===== Helpers privados =====

  private decodeUserFromToken(token: string): any {
    try {
      const decoded: any = jwtDecode(token);
      if (decoded?.sub) {
        try {
          return JSON.parse(decoded.sub);
        } catch {
          return decoded.sub;
        }
      }
      return decoded;
    } catch {
      return null;
    }
  }

  private isTokenExpired(token: string): boolean {
    try {
      const decoded: any = jwtDecode(token);
      if (decoded?.exp) {
        const now = Math.floor(Date.now() / 1000);
        return decoded.exp < now;
      }
      return false;
    } catch {
      return true;
    }
  }
}
