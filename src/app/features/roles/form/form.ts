import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { Empresa } from '../../../core/models/empresa.interface';
import { RolDeProceso } from '../../../core/models/rol-de-proceso.interface';
import { EmpresaService } from '../../../core/services/empresas/empresa';
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
  empresas: Empresa[] = [];
  loading = false; error?: string;

  constructor(
    private fb: FormBuilder,
    private rolService: RolDeProcesoService,
    private empresaService: EmpresaService,
    private route: ActivatedRoute,
    private router: Router
  ){
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.form = this.fb.group({
      empresaId: [null, Validators.required],
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      descripcion: ['', Validators.required],
      status: [0],
    });

    this.empresaService.obtenerTodos().subscribe(e => this.empresas = e);

    if (this.id) {
      this.loading = true;
      this.rolService.obtenerPorId(this.id).subscribe({
        next: (r) => {
          this.form.patchValue({
            empresaId: (r.empresa as any)?.id ?? null,
            nombre: r.nombre,
            descripcion: r.descripcion,
            status: r.status
          });
          this.loading = false;
        },
        error: _ => { this.error = 'No se pudo cargar el rol'; this.loading = false; }
      });
    }
  }

  guardar(){
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }

    const dto = this.form.value;
    const payload: RolDeProceso = {
      id: this.id || 0,
      empresa: { id: dto.empresaId, nombre: '' } as any,
      nombre: dto.nombre!,
      descripcion: dto.descripcion!,
      status: dto.status!,
    };

    this.loading = true;
    const req = this.id
      ? this.rolService.actualizarRol(this.id, payload)
      : this.rolService.crearRol(payload);

    req.subscribe({
      next: () => this.router.navigate(['/roles']),
      error: _ => { this.error = 'No se pudo guardar'; this.loading = false; }
    });
  }
}