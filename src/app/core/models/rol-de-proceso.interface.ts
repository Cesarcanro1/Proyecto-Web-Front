import { EmpresaResumen } from "./proceso.interface";

export interface RolDeProceso {
  id: number;
  empresa: EmpresaResumen; // relación a empresa (solo id y nombre)
  nombre: string;
  descripcion: string;
  status: number; // 0 = activo, 1 = eliminado
}
