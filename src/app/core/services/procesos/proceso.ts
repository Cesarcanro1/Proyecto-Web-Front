import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proceso } from '../../models/proceso.interface';
import { AuthService } from '../auth/auth';

@Injectable({
  providedIn: 'root'
})
export class ProcesoService {
  private readonly apiUrl = 'http://backend.10.43.103.143.nip.io/api/procesos';

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  /** Headers con Authorization: Bearer <token> */
  private authOptions() {
    const token = this.auth.getToken();
    return token
      ? { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) }
      : {};
  }

  /** ================= CRUD ================= */

  // Obtener todos los procesos activos
  obtenerTodos(): Observable<Proceso[]> {
    return this.http.get<Proceso[]>(this.apiUrl, this.authOptions());
  }

  // Obtener todos (incluyendo eliminados)
  obtenerTodosInclusoEliminados(): Observable<Proceso[]> {
    return this.http.get<Proceso[]>(`${this.apiUrl}/all-including-deleted`, this.authOptions());
  }

  // Obtener proceso por ID
  obtenerPorId(id: number): Observable<Proceso> {
    return this.http.get<Proceso>(`${this.apiUrl}/${id}`, this.authOptions());
  }

  // Crear nuevo proceso
  crearProceso(proceso: Proceso): Observable<Proceso> {
    return this.http.post<Proceso>(this.apiUrl, proceso, this.authOptions());
  }

  // Actualizar proceso existente
  actualizarProceso(id: number, proceso: Proceso): Observable<Proceso> {
    return this.http.put<Proceso>(`${this.apiUrl}/${id}`, proceso, this.authOptions());
  }

  // Eliminar proceso
  eliminarProceso(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.authOptions());
  }
}
