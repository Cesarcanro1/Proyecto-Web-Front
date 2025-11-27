import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProcesosService } from '../../../core/services/procesos/proceso';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create.html',
  styleUrls: ['./create.scss']
})
export class Create {

  nombre: string = '';
  descripcion: string = '';
  categoria: string = 'Operativo';
  estado: string = 'Borrador';

  constructor(
    private procesosService: ProcesosService,
    private router: Router
  ) {}

  guardar() {
    const data = {
      empresaId: 1, // Fijo por ahora
      nombre: this.nombre,
      descripcion: this.descripcion,
      categoria: this.categoria,
      estado: this.estado
    };

    this.procesosService.crear(data).subscribe({
      next: (res) => {
        console.log("Proceso creado:", res);

        // NAVEGA de vuelta a la lista
        this.router.navigate(['/procesos']);
      },
      error: (err) => {
        console.error("Error al crear proceso:", err);
      }
    });
  }
}
