import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empresa } from '../../models/empresa.interface';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private apiUrl = 'http://backend.10.43.103.143.nip.io/api/empresas';

  constructor(private http: HttpClient) {}

  // Obtener todas las empresas activas
  obtenerTodos(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(this.apiUrl);
  }

  // Obtener todas las empresas (incluyendo eliminadas)
  obtenerTodosInclusoEliminados(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(`${this.apiUrl}/all-including-deleted`);
  }

  // Obtener empresa por ID
  obtenerPorId(id: number): Observable<Empresa> {
    return this.http.get<Empresa>(`${this.apiUrl}/${id}`);
  }

  // Crear nueva empresa
  crearEmpresa(empresa: Empresa): Observable<Empresa> {
    return this.http.post<Empresa>(this.apiUrl, empresa);
  }

  // Actualizar empresa existente
  actualizarEmpresa(id: number, empresa: Empresa): Observable<Empresa> {
    return this.http.put<Empresa>(`${this.apiUrl}/${id}`, empresa);
  }

  // Eliminar empresa (soft delete)
  eliminarEmpresa(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
