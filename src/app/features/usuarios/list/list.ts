import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Usuario } from '../../../core/models/usuario.interface';
import { UsuarioService } from '../../../core/services/usuarios/usuario';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, RouterLink,
    MatTableModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule,
    MatPaginatorModule, MatSortModule],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List implements OnInit {
  cols = ['nombres','apellidos','email','empresa','status','acciones'];
  dataSource = new MatTableDataSource<Usuario>([]);
  loading = false; error?: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(){ this.load(); }

  load(){
    this.loading = true; this.error = undefined;
    this.usuarioService.obtenerTodos().subscribe({
      next: res => {
        this.dataSource.data = res || [];
        this.dataSource.filterPredicate = (u: Usuario, f: string) => {
          f = f.toLowerCase();
          const s = (v?: string) => (v ?? '').toLowerCase().includes(f);
          return s(u.nombres) || s(u.apellidos) || s(u.email) || s(u.empresa?.nombre);
        };
        this.loading = false;
        queueMicrotask(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      },
      error: _ => { this.error = 'No se pudieron cargar los usuarios'; this.loading = false; }
    });
  }

  applyFilter(v: string){
    this.dataSource.filter = v.trim().toLowerCase();
    this.dataSource.paginator?.firstPage();
  }

  // Soft delete si tu back soporta status en update; si no, cambia a eliminarUsuarioHard
  borrar(id: number){
    if (!confirm('¿Eliminar este usuario?')) return;
    this.usuarioService.softDelete(id).subscribe({
      next: () => this.load(),
      error: _ => this.error = 'No se pudo eliminar'
    });
  }
}
