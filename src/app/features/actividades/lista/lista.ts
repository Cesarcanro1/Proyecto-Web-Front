import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Actividad } from '../../../core/models/actividad.interface';
import { ActividadService } from '../../../core/services/actividades/actividad';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CommonModule, RouterLink, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './lista.html',
  styleUrl: './lista.scss',
})
export class Lista implements OnInit {
  data: Actividad[] = [];
  cols = ['nombre','tipo','rolResponsable','proceso','acciones'];
  loading = false; error?: string;

  constructor(private actividadService: ActividadService) {}

  ngOnInit(){ this.load(); }

  load(){
    this.loading = true; this.error = undefined;
    this.actividadService.obtenerTodos().subscribe({
      next: res => { this.data = res; this.loading = false; },
      error: err => { console.error(err); this.error = 'No se pudieron cargar las actividades'; this.loading = false; }
    });
  }

  borrar(id: number){
    if (!confirm('¿Eliminar esta actividad?')) return;
    this.actividadService.eliminarActividad(id).subscribe({
      next: () => this.load(),
      error: err => { console.error(err); this.error = 'No se pudo eliminar'; }
    });
  }
}
