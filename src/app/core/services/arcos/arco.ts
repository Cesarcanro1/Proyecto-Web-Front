import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Arco } from '../../models/arco.interface';

@Injectable({
  providedIn: 'root'
})
export class ArcoService {
  private apiUrl = 'http://backend.10.43.103.143.nip.io/api/arcos';

  constructor(private http: HttpClient) {}

  // Obtener todos los arcos activos
  obtenerTodos(): Observable<Arco[]> {
    return this.http.get<Arco[]>(this.apiUrl);
  }

  // Obtener todos los arcos (incluyendo eliminados)
  obtenerTodosInclusoEliminados(): Observable<Arco[]> {
    return this.http.get<Arco[]>(`${this.apiUrl}/all-including-deleted`);
  }

  // Obtener arco por ID
  obtenerPorId(id: number): Observable<Arco> {
    return this.http.get<Arco>(`${this.apiUrl}/${id}`);
  }

  // Crear nuevo arco
  crearArco(arco: Arco): Observable<Arco> {
    return this.http.post<Arco>(this.apiUrl, arco);
  }

  // Actualizar arco existente
  actualizarArco(id: number, arco: Arco): Observable<Arco> {
    return this.http.put<Arco>(`${this.apiUrl}/${id}`, arco);
  }

  // Eliminar arco (soft delete)
  eliminarArco(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
