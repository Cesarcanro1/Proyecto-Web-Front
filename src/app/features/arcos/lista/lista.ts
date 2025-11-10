import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Arco } from '../../../core/models/arco.interface';
import { ArcoService } from '../../../core/services/arcos/arco';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CommonModule, RouterLink, MatTableModule, MatButtonModule],
  templateUrl: './lista.html',
  styleUrl: './lista.scss',
})
export class Lista implements OnInit {
  data: Arco[] = [];
  cols = ['proceso','origen','destino','condicion','acciones'];
  loading = false; error?: string;

  constructor(private arcoService: ArcoService) {}

  ngOnInit(){ this.load(); }

  load(){
    this.loading = true; this.error = undefined;
    this.arcoService.obtenerTodos().subscribe({
      next: res => { this.data = res; this.loading = false; },
      error: _ => { this.error = 'No se pudieron cargar los arcos'; this.loading = false; }
    });
  }

  borrar(id: number){
    if (!confirm('¿Eliminar este arco?')) return;
    this.arcoService.eliminarArco(id).subscribe({
      next: () => this.load(),
      error: _ => { this.error = 'No se pudo eliminar'; }
    });
  }
}
