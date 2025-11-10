import { Actividad } from "./actividad.interface";
import { Arco } from "./arco.interface";
import { Gateway } from "./gateway.interface";

export interface Proceso {
  id: number;
  empresa: EmpresaResumen;   // referencia mínima de la empresa
  nombre: string;
  descripcion: string;
  categoria: string;         // "Administrativo", "Operativo", etc.
  estado: 'Borrador' | 'Publicado';
  status: number;            // 0 = activo, 1 = eliminado
  actividades?: Actividad[];
  gateways?: Gateway[];
  arcos?: Arco[];
}

// Simplifica la empresa (solo lo que viene en JSON)
export interface EmpresaResumen {
  id: number;
  nombre: string;
}
