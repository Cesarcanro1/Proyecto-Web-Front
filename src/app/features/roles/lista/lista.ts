import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { RolDeProceso } from '../../../core/models/rol-de-proceso.interface';
import { RolDeProcesoService } from '../../../core/services/roles/rol-de-proceso';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CommonModule, RouterLink, MatTableModule, MatButtonModule],
  templateUrl: './lista.html',
  styleUrl: './lista.scss',
})
export class Lista implements OnInit {
  data: RolDeProceso[] = [];
  cols = ['nombre','descripcion','empresa','acciones'];
  loading = false; error?: string;

  constructor(private rolService: RolDeProcesoService) {}

  ngOnInit(){ this.load(); }

  load(){
    this.loading = true; this.error = undefined;
    this.rolService.obtenerTodos().subscribe({
      next: res => { this.data = res; this.loading = false; },
      error: _ => { this.error = 'No se pudieron cargar los roles'; this.loading = false; }
    });
  }

  borrar(id: number){
    if (!confirm('¿Eliminar este rol?')) return;
    this.rolService.eliminarRol(id).subscribe({
      next: () => this.load(),
      error: _ => { this.error = 'No se pudo eliminar'; }
    });
  }
}