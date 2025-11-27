import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { ProcesosService } from '../../../core/services/procesos/proceso';

@Component({
  selector: 'app-procesos-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list.html',
  styleUrls: ['./list.scss']
})
export class ListComponent implements OnInit {

  procesos: any[] = [];

  constructor(private procesosService: ProcesosService) {}

  ngOnInit(): void {
    this.cargarProcesos();
  }

  cargarProcesos() {
    this.procesosService.listar().subscribe({
      next: (data) => {
        this.procesos = data;
        console.log("Procesos cargados:", data);
      },
      error: (err) => {
        console.error("Error al cargar procesos:", err);
      }
    });
  }

}
