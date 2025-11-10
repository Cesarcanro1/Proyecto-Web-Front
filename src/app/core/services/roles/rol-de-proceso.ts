import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RolDeProceso } from '../../models/rol-de-proceso.interface';

@Injectable({
  providedIn: 'root'
})
export class RolDeProcesoService {
  private apiUrl = 'http://backend.10.43.103.143.nip.io/api/roles-de-proceso';

  constructor(private http: HttpClient) {}

  // Obtener todos los roles activos
  obtenerTodos(): Observable<RolDeProceso[]> {
    return this.http.get<RolDeProceso[]>(this.apiUrl);
  }

  // Obtener todos los roles (incluyendo eliminados)
  obtenerTodosInclusoEliminados(): Observable<RolDeProceso[]> {
    return this.http.get<RolDeProceso[]>(`${this.apiUrl}/all-including-deleted`);
  }

  // Obtener un rol por ID
  obtenerPorId(id: number): Observable<RolDeProceso> {
    return this.http.get<RolDeProceso>(`${this.apiUrl}/${id}`);
  }

  // Crear nuevo rol
  crearRol(rol: RolDeProceso): Observable<RolDeProceso> {
    return this.http.post<RolDeProceso>(this.apiUrl, rol);
  }

  // Actualizar un rol existente
  actualizarRol(id: number, rol: RolDeProceso): Observable<RolDeProceso> {
    return this.http.put<RolDeProceso>(`${this.apiUrl}/${id}`, rol);
  }

  // Eliminar rol (soft delete)
  eliminarRol(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
