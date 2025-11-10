import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { Actividad } from '../../../core/models/actividad.interface';
import { Proceso } from '../../../core/models/proceso.interface';
import { RolDeProceso } from '../../../core/models/rol-de-proceso.interface';
import { ActividadService } from '../../../core/services/actividades/actividad';
import { ProcesoService } from '../../../core/services/procesos/proceso';
import { RolDeProcesoService } from '../../../core/services/roles/rol-de-proceso';

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
  roles: RolDeProceso[] = [];
  loading = false; error?: string;

  constructor(
    private fb: FormBuilder,
    private actividadService: ActividadService,
    private procesoService: ProcesoService,
    private rolService: RolDeProcesoService,
    private route: ActivatedRoute,
    private router: Router
  ){
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.form = this.fb.group({
      procesoId: [null, Validators.required],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      tipo: ['', Validators.required],
      descripcion: ['', Validators.required],
      rolResponsable: ['', Validators.required],
      status: [0],
    });

    // combos
    this.procesoService.obtenerTodos().subscribe(p => this.procesos = p);
    this.rolService.obtenerTodos().subscribe(r => this.roles = r);

    // editar
    if (this.id) {
      this.loading = true;
      this.actividadService.obtenerPorId(this.id).subscribe({
        next: (a) => {
          this.form.patchValue({
            procesoId: (a.proceso as any)?.id ?? null,
            nombre: a.nombre,
            tipo: a.tipo,
            descripcion: a.descripcion,
            rolResponsable: a.rolResponsable,
            status: a.status
          });
          this.loading = false;
        },
        error: (e) => { console.error(e); this.error = 'No se pudo cargar la actividad'; this.loading = false; }
      });
    }
  }

  guardar(){
    if (this.form.invalid) return;
    const dto = this.form.value;

    // construir payload para el back
    const payload: Actividad = {
      id: this.id || 0,
      proceso: { id: dto.procesoId, nombre: '' } as any,
      nombre: dto.nombre!,
      tipo: dto.tipo!,
      descripcion: dto.descripcion!,
      rolResponsable: dto.rolResponsable!,
      status: dto.status!,
    };

    this.loading = true;
    const req = this.id
      ? this.actividadService.actualizarActividad(this.id, payload)
      : this.actividadService.crearActividad(payload);

    req.subscribe({
      next: () => this.router.navigate(['/actividades']),
      error: (e) => { console.error(e); this.error = 'No se pudo guardar'; this.loading = false; }
    });
  }
}
