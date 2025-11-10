import { Component } from '@angular/core';
import { Proceso } from '../../../core/models/proceso.interface';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { Arco } from '../../../core/models/arco.interface';
import { ArcoService } from '../../../core/services/arcos/arco';
import { ProcesoService } from '../../../core/services/procesos/proceso';

@Component({
  selector: 'app-form',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class Form {
  id!: number;
  form!: FormGroup;
  procesos: Proceso[] = [];
  loading = false; error?: string;

  tiposNodo = ['Actividad','Gateway'] as const;

  constructor(
    private fb: FormBuilder,
    private arcoService: ArcoService,
    private procesoService: ProcesoService,
    private route: ActivatedRoute,
    private router: Router
  ){
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.form = this.fb.group({
      procesoId: [null, Validators.required],
      origenTipo: ['Actividad', Validators.required],
      origenId: [null, [Validators.required, Validators.min(1)]],
      destinoTipo: ['Actividad', Validators.required],
      destinoId: [null, [Validators.required, Validators.min(1)]],
      condicion: [''],
      status: [0],
    });

    this.procesoService.obtenerTodos().subscribe(p => this.procesos = p);

    if (this.id) {
      this.loading = true;
      this.arcoService.obtenerPorId(this.id).subscribe({
        next: (a) => {
          this.form.patchValue({
            procesoId: (a.proceso as any)?.id ?? null,
            origenTipo: a.origenTipo,
            origenId: a.origenId,
            destinoTipo: a.destinoTipo,
            destinoId: a.destinoId,
            condicion: a.condicion ?? '',
            status: a.status
          });
          this.loading = false;
        },
        error: _ => { this.error = 'No se pudo cargar el arco'; this.loading = false; }
      });
    }
  }

  guardar(){
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }

    const dto = this.form.value;
    const payload: Arco = {
      id: this.id || 0,
      proceso: { id: dto.procesoId, nombre: '' } as any,
      origenTipo: dto.origenTipo!,
      origenId: dto.origenId!,
      destinoTipo: dto.destinoTipo!,
      destinoId: dto.destinoId!,
      condicion: dto.condicion || undefined,
      status: dto.status!,
    };

    this.loading = true;
    const req = this.id
      ? this.arcoService.actualizarArco(this.id, payload)
      : this.arcoService.crearArco(payload);

    req.subscribe({
      next: () => this.router.navigate(['/arcos']),
      error: _ => { this.error = 'No se pudo guardar'; this.loading = false; }
    });
  }
}