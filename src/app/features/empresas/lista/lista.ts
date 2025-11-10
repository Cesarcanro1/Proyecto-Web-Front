import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Empresa } from '../../../core/models/empresa.interface';
import { EmpresaService } from '../../../core/services/empresas/empresa';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CommonModule, RouterLink, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './lista.html',
  styleUrl: './lista.scss',
})
export class Lista implements OnInit {
  data: Empresa[] = [];
  cols = ['nombre','nit','correoContacto','acciones'];
  loading = false; error?: string;

  constructor(private empresaService: EmpresaService) {}

  ngOnInit(){ this.load(); }

  load(){
    this.loading = true; this.error = undefined;
    this.empresaService.obtenerTodos().subscribe({
      next: res => { this.data = res; this.loading = false; },
      error: _ => { this.error = 'No se pudieron cargar las empresas'; this.loading = false; }
    });
  }

  borrar(id: number){
    if (!confirm('¿Eliminar esta empresa?')) return;
    this.empresaService.eliminarEmpresa(id).subscribe({
      next: () => this.load(),
      error: _ => { this.error = 'No se pudo eliminar'; }
    });
  }
}
