import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RolDeProceso } from '../../models/rol-de-proceso.interface';
import { AuthService } from '../auth/auth';

@Injectable({
  providedIn: 'root'
})
export class RolDeProcesoService {
  
  private readonly apiUrl = 'http://backend.10.43.103.143.nip.io/api/roles-de-proceso';

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  /** 
   * Añade el token al header si existe
   */
  private authOptions() {
    const token = this.auth.getToken();
    return token
      ? { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) }
      : {};
  }

  // =====================================================
  // =============== CRUD COMPLETO ========================
  // =====================================================

  /** Obtener todos los roles activos */
  obtenerTodos(): Observable<RolDeProceso[]> {
    return this.http.get<RolDeProceso[]>(this.apiUrl, this.authOptions());
  }

  /** Obtener todos (incluyendo eliminados) */
  obtenerTodosInclusoEliminados(): Observable<RolDeProceso[]> {
    return this.http.get<RolDeProceso[]>(
      `${this.apiUrl}/all-including-deleted`,
      this.authOptions()
    );
  }

  /** Obtener rol por ID */
  obtenerPorId(id: number): Observable<RolDeProceso> {
    return this.http.get<RolDeProceso>(
      `${this.apiUrl}/${id}`,
      this.authOptions()
    );
  }

  /** Crear rol */
  crearRol(rol: RolDeProceso): Observable<RolDeProceso> {
    return this.http.post<RolDeProceso>(
      this.apiUrl, 
      rol, 
      this.authOptions()
    );
  }

  /** Actualizar rol */
  actualizarRol(id: number, rol: RolDeProceso): Observable<RolDeProceso> {
    return this.http.put<RolDeProceso>(
      `${this.apiUrl}/${id}`,
      rol,
      this.authOptions()
    );
  }

  /** Eliminar rol (soft delete o hard delete según backend) */
  eliminarRol(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`,
      this.authOptions()
    );
  }

}
