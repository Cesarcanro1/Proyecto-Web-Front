import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { RolDeProceso } from '../../../core/models/rol-de-proceso.interface';
import { RolDeProcesoService } from '../../../core/services/roles/rol-de-proceso';
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
  cols = ['nombre','descripcion','empresa','acciones'];
  dataSource = new MatTableDataSource<RolDeProceso>([]);
  loading = false; error?: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private rolService: RolDeProcesoService) {}

  ngOnInit(){ this.load(); }

  load(){
    this.loading = true; this.error = undefined;
    this.rolService.obtenerTodos().subscribe({
      next: res => {
        this.dataSource.data = res || [];
        this.dataSource.filterPredicate = (r: RolDeProceso, f: string) => {
          f = f.toLowerCase();
          const s = (v?: string) => (v ?? '').toLowerCase().includes(f);
          return s(r.nombre) || s(r.descripcion) || s((r.empresa as any)?.nombre);
        };
        this.loading = false;
        queueMicrotask(() => { this.dataSource.paginator = this.paginator; });
      },
      error: _ => { this.error = 'No se pudieron cargar los roles'; this.loading = false; }
    });
  }

  applyFilter(v: string){
    this.dataSource.filter = v.trim().toLowerCase();
    this.dataSource.paginator?.firstPage();
  }

  borrar(id: number){
    if (!confirm('¿Eliminar este rol?')) return;
    this.rolService.eliminarRol(id).subscribe({
      next: () => this.load(),
      error: _ => this.error = 'No se pudo eliminar'
    });
  }
}