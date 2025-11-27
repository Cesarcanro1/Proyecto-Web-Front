import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcesosService {

  private apiUrl = 'http://backend.10.43.103.143.nip.io/api/procesos';

  constructor(private http: HttpClient) {}

  /** Obtener lista de procesos */
  listar(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  /** Crear un nuevo proceso */
  crear(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  /** Obtener un proceso por ID */
  obtener(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  /** Actualizar un proceso */
  actualizar(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  /** Eliminar un proceso */
  eliminar(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
