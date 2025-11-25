export interface UsuarioDTO {
    id?: number;
  empresaId: number;
  nombres: string;
  apellidos: string;
  email: string;
  password?: string; // solo en crear/actualizar
  status: number;    // 0 = activo, 1 = eliminado (soft delete)
}
