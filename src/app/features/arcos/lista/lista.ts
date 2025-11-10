import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Arco } from '../../../core/models/arco.interface';
import { ArcoService } from '../../../core/services/arcos/arco';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CommonModule, RouterLink,
    MatTableModule, MatButtonModule,
    MatFormFieldModule, MatInputModule,
    MatPaginatorModule],
  templateUrl: './lista.html',
  styleUrl: './lista.scss',
})
export class Lista implements OnInit {
  cols = ['proceso','origen','destino','condicion','acciones'];
  dataSource = new MatTableDataSource<Arco>([]);
  loading = false; error?: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private arcoService: ArcoService) {}

  ngOnInit(){ this.load(); }

  load(){
    this.loading = true; this.error = undefined;
    this.arcoService.obtenerTodos().subscribe({
      next: res => {
        this.dataSource.data = res || [];
        this.dataSource.filterPredicate = (a: Arco, f: string) => {
          f = f.toLowerCase();
          const s = (v?: string|number) => (String(v ?? '')).toLowerCase().includes(f);
          return s((a.proceso as any)?.nombre) || s(a.origenTipo) || s(a.origenId) || s(a.destinoTipo) || s(a.destinoId) || s(a.condicion);
        };
        this.loading = false;
        queueMicrotask(() => { this.dataSource.paginator = this.paginator; });
      },
      error: _ => { this.error = 'No se pudieron cargar los arcos'; this.loading = false; }
    });
  }

  applyFilter(v: string){
    this.dataSource.filter = v.trim().toLowerCase();
    this.dataSource.paginator?.firstPage();
  }

  borrar(id: number){
    if (!confirm('¿Eliminar este arco?')) return;
    this.arcoService.eliminarArco(id).subscribe({
      next: () => this.load(),
      error: _ => this.error = 'No se pudo eliminar'
    });
  }
}