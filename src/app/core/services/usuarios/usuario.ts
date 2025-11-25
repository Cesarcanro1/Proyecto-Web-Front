import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../../models/usuario.interface';
import { AuthService } from '../auth/auth';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly apiUrl = 'http://backend.10.43.103.143.nip.io/api/usuarios';

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  /** Header con token */
  private authOptions() {
    const token = this.auth.getToken();
    return token
      ? { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) }
      : {};
  }

  /* ==================== CRUD ==================== */

  obtenerTodos(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl, this.authOptions());
  }

  obtenerTodosInclusoEliminados(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/all-including-deleted`, this.authOptions());
  }

  obtenerPorId(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`, this.authOptions());
  }

  crearUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario, this.authOptions());
  }

  actualizarUsuario(id: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/${id}`, usuario, this.authOptions());
  }

  eliminarUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.authOptions());
  }

  /* ============ Perfil / Usuario actual ============ */

  obtenerUsuarioActual(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/me`, this.authOptions());
  }
}
