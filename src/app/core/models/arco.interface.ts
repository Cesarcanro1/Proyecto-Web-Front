import { Proceso } from "./proceso.interface";

export interface Arco {
  id: number;
  proceso: Proceso;       // relación con proceso
  origenTipo: 'Actividad' | 'Gateway';
  origenId: number;
  destinoTipo: 'Actividad' | 'Gateway';
  destinoId: number;
  condicion?: string;     // opcional
  status: number;         // 0 = activo, 1 = eliminado
}
