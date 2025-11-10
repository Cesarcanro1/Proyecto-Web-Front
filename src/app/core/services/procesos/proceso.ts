import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proceso } from '../../models/proceso.interface';

@Injectable({
  providedIn: 'root'
})
export class ProcesoService {
  private apiUrl = 'http://backend.10.43.103.143.nip.io/api/procesos';

  constructor(private http: HttpClient) {}

  // Obtener todos los procesos activos
  obtenerTodos(): Observable<Proceso[]> {
    return this.http.get<Proceso[]>(this.apiUrl);
  }

  // Obtener todos los procesos (incluyendo eliminados)
  obtenerTodosInclusoEliminados(): Observable<Proceso[]> {
    return this.http.get<Proceso[]>(`${this.apiUrl}/all-including-deleted`);
  }

  // Obtener un proceso por ID
  obtenerPorId(id: number): Observable<Proceso> {
    return this.http.get<Proceso>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo proceso
  crearProceso(proceso: Proceso): Observable<Proceso> {
    return this.http.post<Proceso>(this.apiUrl, proceso);
  }

  // Actualizar un proceso existente
  actualizarProceso(id: number, proceso: Proceso): Observable<Proceso> {
    return this.http.put<Proceso>(`${this.apiUrl}/${id}`, proceso);
  }

  // Eliminar 
  eliminarProceso(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
