import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Actividad } from '../../../core/models/actividad.interface';
import { ActividadService } from '../../../core/services/actividades/actividad';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CommonModule, RouterLink, MatTableModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSortModule],
  templateUrl: './lista.html',
  styleUrl: './lista.scss',
})
export class Lista implements OnInit {
  cols = ['nombre','tipo','rolResponsable','proceso','acciones'];
  dataSource = new MatTableDataSource<Actividad>([]);
  loading = false; error?: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private actividadService: ActividadService) {}

  ngOnInit(){ this.load(); }

  load(){
    this.loading = true; this.error = undefined;
    this.actividadService.obtenerTodos().subscribe({
      next: (res) => {
        this.dataSource.data = res || [];
        // filtro por nombre/tipo/rol/proceso
        this.dataSource.filterPredicate = (a: Actividad, filter: string) => {
          const f = filter.toLowerCase();
          const s = (v?: string) => (v ?? '').toLowerCase().includes(f);
          return s(a.nombre) || s(a.tipo) || s(a.rolResponsable) || s((a.proceso as any)?.nombre);
        };
        this.loading = false;
        queueMicrotask(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      },
      error: (e) => { console.error(e); this.error = 'No se pudieron cargar las actividades'; this.loading = false; }
    });
  }

  applyFilter(value: string){
    this.dataSource.filter = value.trim().toLowerCase();
    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
  }

  borrar(id: number){
    if (!confirm('¿Eliminar esta actividad?')) return;
    this.actividadService.eliminarActividad(id).subscribe({
      next: () => this.load(),
      error: (e) => { console.error(e); this.error = 'No se pudo eliminar'; }
    });
  }
}
