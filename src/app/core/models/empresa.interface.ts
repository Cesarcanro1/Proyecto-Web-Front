import { Proceso } from "./proceso.interface";
import { RolDeProceso } from "./rol-de-proceso.interface";


export interface Empresa {
  id: number;
  nombre: string;
  nit: string;
  correoContacto: string;
  status: number;              // 0 = activo, 1 = eliminado
  procesos?: Proceso[];        // opcional para evitar ciclos
  usuarios?: UsuarioEmpresa[]; // se define más adelante
  rolesDeProceso?: RolDeProceso[];
}

// versión mínima usada en referencias (como en Proceso y RolDeProceso)
export interface EmpresaResumen {
  id: number;
  nombre: string;
}

// placeholder rápido para usuarios (se define completo cuando pase el entity)
export interface UsuarioEmpresa {
  id: number;
  nombre: string;
  correo: string;
}