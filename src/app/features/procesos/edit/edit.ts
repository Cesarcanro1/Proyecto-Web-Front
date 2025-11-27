import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProcesosService } from '../../../core/services/procesos/proceso';

@Component({
  selector: 'app-procesos-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit.html',
  styleUrls: ['./edit.scss']
})
export class Edit implements OnInit {

  id!: number;

  nombre: string = "";
  descripcion: string = "";
  categoria: string = "Operativo";
  estado: string = "Borrador";

  constructor(
    private procesosService: ProcesosService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarProceso();
  }

  cargarProceso() {
    this.procesosService.obtener(this.id).subscribe({
      next: (data) => {
        this.nombre = data.nombre;
        this.descripcion = data.descripcion;
        this.categoria = data.categoria;
        this.estado = data.estado;
      },
      error: (err) => console.error("Error cargando proceso:", err)
    });
  }

  guardarCambios() {
    const cuerpo = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      categoria: this.categoria,
      estado: this.estado
    };

    this.procesosService.actualizar(this.id, cuerpo).subscribe({
      next: () => {
        console.log("Proceso actualizado");
        this.router.navigate(['/procesos']);
      },
      error: (err) => console.error("Error actualizando proceso:", err)
    });
  }
}
