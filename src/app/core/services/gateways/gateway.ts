import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gateway } from '../../models/gateway.interface';

@Injectable({
  providedIn: 'root'
})
export class GatewayService {
  private apiUrl = 'http://backend.10.43.103.143.nip.io/api/gateways';

  constructor(private http: HttpClient) {}

  // Obtener todos los gateways activos
  obtenerTodos(): Observable<Gateway[]> {
    return this.http.get<Gateway[]>(this.apiUrl);
  }

  // Obtener todos los gateways (incluyendo eliminados)
  obtenerTodosInclusoEliminados(): Observable<Gateway[]> {
    return this.http.get<Gateway[]>(`${this.apiUrl}/all-including-deleted`);
  }

  // Obtener gateway por ID
  obtenerPorId(id: number): Observable<Gateway> {
    return this.http.get<Gateway>(`${this.apiUrl}/${id}`);
  }

  // Crear nuevo gateway
  crearGateway(gateway: Gateway): Observable<Gateway> {
    return this.http.post<Gateway>(this.apiUrl, gateway);
  }

  // Actualizar gateway existente
  actualizarGateway(id: number, gateway: Gateway): Observable<Gateway> {
    return this.http.put<Gateway>(`${this.apiUrl}/${id}`, gateway);
  }

  // Eliminar gateway (soft delete)
  eliminarGateway(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}