import { EmpresaResumen } from "./empresa.interface";

export interface Usuario {
  id: number;
  empresa: EmpresaResumen;  // referencia de la empresa
  nombres: string;
  apellidos: string;
  email: string;
  password: string;
  status: number;            // 0 = activo, 1 = eliminado
}
