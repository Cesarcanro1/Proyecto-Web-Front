import { Proceso } from "./proceso.interface";

export interface Gateway {
  id: number;
  proceso: Proceso;       // relación con el proceso al que pertenece
  nombre: string;
  tipo: 'Exclusivo' | 'Paralelo' | 'Inclusivo';  // tipos válidos
  descripcion: string;
  status: number;         // 0 = activo, 1 = eliminado
}
