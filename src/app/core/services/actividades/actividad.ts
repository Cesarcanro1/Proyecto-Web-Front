import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Actividad } from '../../models/actividad.interface';
import { AuthService } from '../auth/auth';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {

  private apiUrl = 'http://backend.10.43.103.143.nip.io/api/actividades';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  obtenerTodos(): Observable<Actividad[]> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<Actividad[]>(this.apiUrl, { headers });
  }

  obtenerTodosInclusoEliminados(): Observable<Actividad[]> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<Actividad[]>(`${this.apiUrl}/all-including-deleted`, { headers });
  }

  obtenerPorId(id: number): Observable<Actividad> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<Actividad>(`${this.apiUrl}/${id}`, { headers });
  }

  crearActividad(actividad: Actividad): Observable<Actividad> {
    const headers = this.authService.getAuthHeaders();
    return this.http.post<Actividad>(this.apiUrl, actividad, { headers });
  }

  actualizarActividad(id: number, actividad: Actividad): Observable<Actividad> {
    const headers = this.authService.getAuthHeaders();
    return this.http.put<Actividad>(`${this.apiUrl}/${id}`, actividad, { headers });
  }

  eliminarActividad(id: number): Observable<void> {
    const headers = this.authService.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }
}
