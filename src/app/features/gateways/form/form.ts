import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { Gateway } from '../../../core/models/gateway.interface';
import { Proceso } from '../../../core/models/proceso.interface';
import { GatewayService } from '../../../core/services/gateways/gateway';
import { ProcesoService } from '../../../core/services/procesos/proceso';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class Form {
  id!: number;
  form!: FormGroup;
  procesos: Proceso[] = [];
  loading = false; error?: string;

  constructor(
    private fb: FormBuilder,
    private gatewayService: GatewayService,
    private procesoService: ProcesoService,
    private route: ActivatedRoute,
    private router: Router
  ){
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.form = this.fb.group({
      procesoId: [null, Validators.required],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      tipo: ['Exclusivo', Validators.required], // Exclusivo | Paralelo | Inclusivo
      descripcion: ['', Validators.required],
      status: [0],
    });

    this.procesoService.obtenerTodos().subscribe(p => this.procesos = p);

    if (this.id) {
      this.loading = true;
      this.gatewayService.obtenerPorId(this.id).subscribe({
        next: (g) => {
          this.form.patchValue({
            procesoId: (g.proceso as any)?.id ?? null,
            nombre: g.nombre,
            tipo: g.tipo,
            descripcion: g.descripcion,
            status: g.status
          });
          this.loading = false;
        },
        error: _ => { this.error = 'No se pudo cargar el gateway'; this.loading = false; }
      });
    }
  }

  guardar(){
    if (this.form.invalid) return;
    const dto = this.form.value;
    const payload: Gateway = {
      id: this.id || 0,
      proceso: { id: dto.procesoId, nombre: '' } as any,
      nombre: dto.nombre!,
      tipo: dto.tipo!,
      descripcion: dto.descripcion!,
      status: dto.status!,
    };

    this.loading = true;
    const req = this.id
      ? this.gatewayService.actualizarGateway(this.id, payload)
      : this.gatewayService.crearGateway(payload);

    req.subscribe({
      next: () => this.router.navigate(['/gateways']),
      error: _ => { this.error = 'No se pudo guardar'; this.loading = false; }
    });
  }
}
