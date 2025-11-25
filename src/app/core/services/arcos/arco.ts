import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Arco } from '../../models/arco.interface';
import { AuthService } from '../auth/auth';

@Injectable({
  providedIn: 'root'
})
export class ArcoService {
  
  private apiUrl = 'http://backend.10.43.103.143.nip.io/api/arcos';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  obtenerTodos(): Observable<Arco[]> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<Arco[]>(this.apiUrl, { headers });
  }

  obtenerTodosInclusoEliminados(): Observable<Arco[]> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<Arco[]>(`${this.apiUrl}/all-including-deleted`, { headers });
  }

  obtenerPorId(id: number): Observable<Arco> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<Arco>(`${this.apiUrl}/${id}`, { headers });
  }

  crearArco(arco: Arco): Observable<Arco> {
    const headers = this.authService.getAuthHeaders();
    return this.http.post<Arco>(this.apiUrl, arco, { headers });
  }

  actualizarArco(id: number, arco: Arco): Observable<Arco> {
    const headers = this.authService.getAuthHeaders();
    return this.http.put<Arco>(`${this.apiUrl}/${id}`, arco, { headers });
  }

  eliminarArco(id: number): Observable<void> {
    const headers = this.authService.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }
}
