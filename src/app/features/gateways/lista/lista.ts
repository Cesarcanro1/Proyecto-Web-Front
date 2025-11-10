import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Gateway } from '../../../core/models/gateway.interface';
import { GatewayService } from '../../../core/services/gateways/gateway';
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
  cols = ['nombre','tipo','proceso','acciones'];
  dataSource = new MatTableDataSource<Gateway>([]);
  loading = false; error?: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private gatewayService: GatewayService) {}

  ngOnInit(){ this.load(); }

  load(){
    this.loading = true; this.error = undefined;
    this.gatewayService.obtenerTodos().subscribe({
      next: res => {
        this.dataSource.data = res || [];
        this.dataSource.filterPredicate = (g: Gateway, f: string) => {
          f = f.toLowerCase();
          const s = (v?: string) => (v ?? '').toLowerCase().includes(f);
          return s(g.nombre) || s(g.tipo) || s((g.proceso as any)?.nombre);
        };
        this.loading = false;
        queueMicrotask(() => { this.dataSource.paginator = this.paginator; this.dataSource.sort = this.sort; });
      },
      error: _ => { this.error = 'No se pudieron cargar los gateways'; this.loading = false; }
    });
  }

  applyFilter(v: string){
    this.dataSource.filter = v.trim().toLowerCase();
    this.dataSource.paginator?.firstPage();
  }

  borrar(id: number){
    if (!confirm('¿Eliminar este gateway?')) return;
    this.gatewayService.eliminarGateway(id).subscribe({
      next: () => this.load(),
      error: _ => this.error = 'No se pudo eliminar'
    });
  }
}
