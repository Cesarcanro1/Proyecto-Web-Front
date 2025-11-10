import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Proceso } from '../../../core/models/proceso.interface';
import { ProcesoService } from '../../../core/services/procesos/proceso';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-lista',
  imports: [CommonModule, RouterLink, MatTableModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSortModule],
  templateUrl: './lista.html',
  styleUrl: './lista.scss',
})
export class Lista implements OnInit{
  cols = ['nombre','categoria','estado','empresa','acciones'];
  dataSource = new MatTableDataSource<Proceso>([]);
  loading = false;
  error?: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private procesoService: ProcesoService) {}

  ngOnInit(){ this.load(); }

  load(){
    this.loading = true; this.error = undefined;
    this.procesoService.obtenerTodos().subscribe({
      next: (res) => {
        this.dataSource.data = res || [];
        // filtro por nombre/categoría/estado/empresa
        this.dataSource.filterPredicate = (p: Proceso, filter: string) => {
          const hay = (v?: string) => (v ?? '').toLowerCase().includes(filter);
          return (
            hay(p.nombre?.toLowerCase()) ||
            hay(p.categoria?.toLowerCase()) ||
            hay(p.estado?.toLowerCase()) ||
            hay((p.empresa as any)?.nombre?.toLowerCase())
          );
        };
        this.loading = false;
        // conecta paginator/sort cuando ya hay data
        queueMicrotask(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      },
      error: err => { this.error = 'No se pudieron cargar los procesos'; console.error(err); this.loading = false; }
    });
  }

  applyFilter(value: string){
    this.dataSource.filter = value.trim().toLowerCase();
    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
  }

  borrar(id: number){
    if (!confirm('¿Eliminar este proceso?')) return;
    this.procesoService.eliminarProceso(id).subscribe({
      next: () => this.load(),
      error: err => { this.error = 'No se pudo eliminar'; console.error(err); }
    });
  }
}
