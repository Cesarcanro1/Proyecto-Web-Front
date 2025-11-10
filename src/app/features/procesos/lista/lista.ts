import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Proceso } from '../../../core/models/proceso.interface';
import { ProcesoService } from '../../../core/services/procesos/proceso';

@Component({
  selector: 'app-lista',
  imports: [CommonModule, RouterLink, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './lista.html',
  styleUrl: './lista.scss',
})
export class Lista implements OnInit{
  data: Proceso[] = [];
  cols = ['nombre','categoria','estado','empresa','acciones'];
  loading = false;
  error?: string;

  constructor(private procesoService: ProcesoService) {}

  ngOnInit(){ this.load(); }

  load(){
    this.loading = true; this.error = undefined;
    this.procesoService.obtenerTodos().subscribe({
      next: res => { this.data = res; this.loading = false; },
      error: err => { this.error = 'No se pudieron cargar los procesos'; console.error(err); this.loading = false; }
    });
  }

  borrar(id: number){
    if (!confirm('¿Eliminar este proceso?')) return;
    this.procesoService.eliminarProceso(id).subscribe({
      next: () => this.load(),
      error: err => { this.error = 'No se pudo eliminar'; console.error(err); }
    });
  }
}
