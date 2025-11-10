import { Proceso } from "./proceso.interface";

export interface Actividad {
  id: number;
  proceso: Proceso;          // relación con proceso
  nombre: string;
  tipo: string;              // "Tarea", "Subproceso", etc.
  descripcion: string;
  rolResponsable: string;    // nombre del rol simple
  status: number;            // 0 = activo, 1 = eliminado
}
