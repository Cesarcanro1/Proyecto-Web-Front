import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empresa } from '../../models/empresa.interface';
import { AuthService } from '../auth/auth';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private readonly apiUrl = 'http://backend.10.43.103.143.nip.io/api/empresas';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

 
   /* Obtiene headers con Authorization: Bearer <token> */
   
  private getHeaders() {
    return { headers: this.authService.getAuthHeaders() };
  }

  /** ==================== CRUD ==================== */

  // Obtener todas las empresas activas
  obtenerTodos(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(this.apiUrl, this.getHeaders());
  }

  // Obtener todas las empresas (incluyendo eliminadas)
  obtenerTodosInclusoEliminados(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(`${this.apiUrl}/all-including-deleted`, this.getHeaders());
  }

  // Obtener empresa por ID
  obtenerPorId(id: number): Observable<Empresa> {
    return this.http.get<Empresa>(`${this.apiUrl}/${id}`, this.getHeaders());
  }

  // Crear nueva empresa
  crearEmpresa(empresa: Empresa): Observable<Empresa> {
    return this.http.post<Empresa>(this.apiUrl, empresa, this.getHeaders());
  }

  // Actualizar empresa existente
  actualizarEmpresa(id: number, empresa: Empresa): Observable<Empresa> {
    return this.http.put<Empresa>(`${this.apiUrl}/${id}`, empresa, this.getHeaders());
  }

  // Eliminar empresa
  eliminarEmpresa(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.getHeaders());
  }
}
