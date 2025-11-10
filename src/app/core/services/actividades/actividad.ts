import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Actividad } from '../../models/actividad.interface';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {
  private apiUrl = 'http://backend.10.43.103.143.nip.io/api/actividades';

  constructor(private http: HttpClient) {}

  // Obtener todas las actividades activas
  obtenerTodos(): Observable<Actividad[]> {
    return this.http.get<Actividad[]>(this.apiUrl);
  }

  // Obtener todas las actividades (incluyendo eliminadas)
  obtenerTodosInclusoEliminados(): Observable<Actividad[]> {
    return this.http.get<Actividad[]>(`${this.apiUrl}/all-including-deleted`);
  }

  // Obtener una actividad por ID
  obtenerPorId(id: number): Observable<Actividad> {
    return this.http.get<Actividad>(`${this.apiUrl}/${id}`);
  }

  // Crear una nueva actividad
  crearActividad(actividad: Actividad): Observable<Actividad> {
    return this.http.post<Actividad>(this.apiUrl, actividad);
  }

  // Actualizar una actividad existente
  actualizarActividad(id: number, actividad: Actividad): Observable<Actividad> {
    return this.http.put<Actividad>(`${this.apiUrl}/${id}`, actividad);
  }

  // Eliminar una actividad (soft delete)
  eliminarActividad(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
