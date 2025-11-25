import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gateway } from '../../models/gateway.interface';
import { AuthService } from '../auth/auth';

@Injectable({
  providedIn: 'root'
})
export class GatewayService {

  private readonly apiUrl = 'http://backend.10.43.103.143.nip.io/api/gateways';

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  /** ================= AUTH HEADERS ================= **/
  private authOptions() {
    const token = this.auth.getToken();
    return token
      ? { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) }
      : {};
  }

  /** ================= CRUD ================= **/

  // Obtener todos los gateways activos
  obtenerTodos(): Observable<Gateway[]> {
    return this.http.get<Gateway[]>(this.apiUrl, this.authOptions());
  }

  // Obtener todos los gateways (incluyendo eliminados)
  obtenerTodosInclusoEliminados(): Observable<Gateway[]> {
    return this.http.get<Gateway[]>(
      `${this.apiUrl}/all-including-deleted`,
      this.authOptions()
    );
  }

  // Obtener gateway por ID
  obtenerPorId(id: number): Observable<Gateway> {
    return this.http.get<Gateway>(
      `${this.apiUrl}/${id}`,
      this.authOptions()
    );
  }

  // Crear gateway
  crearGateway(gateway: Gateway): Observable<Gateway> {
    return this.http.post<Gateway>(
      this.apiUrl,
      gateway,
      this.authOptions()
    );
  }

  // Actualizar gateway
  actualizarGateway(id: number, gateway: Gateway): Observable<Gateway> {
    return this.http.put<Gateway>(
      `${this.apiUrl}/${id}`,
      gateway,
      this.authOptions()
    );
  }

  // Eliminar gateway (soft delete o hard depende del backend)
  eliminarGateway(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`,
      this.authOptions()
    );
  }
}
