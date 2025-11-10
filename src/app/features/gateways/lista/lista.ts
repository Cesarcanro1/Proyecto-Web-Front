import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Gateway } from '../../../core/models/gateway.interface';
import { GatewayService } from '../../../core/services/gateways/gateway';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CommonModule, RouterLink, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './lista.html',
  styleUrl: './lista.scss',
})
export class Lista implements OnInit {
  data: Gateway[] = [];
  cols = ['nombre','tipo','proceso','acciones'];
  loading = false; error?: string;

  constructor(private gatewayService: GatewayService) {}

  ngOnInit(){ this.load(); }

  load(){
    this.loading = true; this.error = undefined;
    this.gatewayService.obtenerTodos().subscribe({
      next: res => { this.data = res; this.loading = false; },
      error: _ => { this.error = 'No se pudieron cargar los gateways'; this.loading = false; }
    });
  }

  borrar(id: number){
    if (!confirm('¿Eliminar este gateway?')) return;
    this.gatewayService.eliminarGateway(id).subscribe({
      next: () => this.load(),
      error: _ => { this.error = 'No se pudo eliminar'; }
    });
  }
}
