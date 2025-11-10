import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Empresa } from '../../../core/models/empresa.interface';
import { EmpresaService } from '../../../core/services/empresas/empresa';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CommonModule, RouterLink,
    MatTableModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule,
    MatPaginatorModule, MatSortModule],
  templateUrl: './lista.html',
  styleUrl: './lista.scss',
})
export class Lista implements OnInit {
  cols = ['nombre','nit','correoContacto','acciones'];
  dataSource = new MatTableDataSource<Empresa>([]);
  loading = false; error?: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private empresaService: EmpresaService) {}

  ngOnInit(){ this.load(); }

  load(){
    this.loading = true; this.error = undefined;
    this.empresaService.obtenerTodos().subscribe({
      next: res => {
        this.dataSource.data = res || [];
        this.dataSource.filterPredicate = (e: Empresa, f: string) => {
          f = f.toLowerCase();
          const s = (v?: string) => (v ?? '').toLowerCase().includes(f);
          return s(e.nombre) || s(e.nit) || s(e.correoContacto);
        };
        this.loading = false;
        queueMicrotask(() => { this.dataSource.paginator = this.paginator; this.dataSource.sort = this.sort; });
      },
      error: _ => { this.error = 'No se pudieron cargar las empresas'; this.loading = false; }
    });
  }

  applyFilter(v: string){
    this.dataSource.filter = v.trim().toLowerCase();
    this.dataSource.paginator?.firstPage();
  }

  borrar(id: number){
    if (!confirm('¿Eliminar esta empresa?')) return;
    this.empresaService.eliminarEmpresa(id).subscribe({
      next: () => this.load(),
      error: _ => this.error = 'No se pudo eliminar'
    });
  }
}
