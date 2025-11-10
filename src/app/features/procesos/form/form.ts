import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { Empresa } from '../../../core/models/empresa.interface';
import { Proceso } from '../../../core/models/proceso.interface';
import { EmpresaService } from '../../../core/services/empresas/empresa';
import { ProcesoService } from '../../../core/services/procesos/proceso';

@Component({
  selector: 'app-form',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class Form {

  id!: number;
  empresas: Empresa[] = [];
  loading = false; error?: string;
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private procesoService: ProcesoService,
    private empresasSrv: EmpresaService,
    private route: ActivatedRoute,
    private router: Router
  ){
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.form = this.fb.group({
      empresaId: [null, Validators.required],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', Validators.required],
      categoria: ['', Validators.required],
      estado: ['Borrador', Validators.required],
      status: [0]
    });

    // cargar empresas
    this.empresasSrv.obtenerTodos().subscribe(e => this.empresas = e);

    // si es edición, precargar
    if (this.id) {
      this.loading = true;
      this.procesoService.obtenerPorId(this.id).subscribe({
        next: (p) => {
          this.form.patchValue({
            empresaId: (p.empresa as any)?.id ?? null,
            nombre: p.nombre,
            descripcion: p.descripcion,
            categoria: p.categoria,
            estado: p.estado,
            status: p.status
          });
          this.loading = false;
        },
        error: (err) => { console.error(err); this.error = 'No se pudo cargar el proceso'; this.loading = false; }
      });
    }
  }

  guardar(){
  if (this.form.invalid) { this.form.markAllAsTouched(); return; }
  const dto: any = this.form.value;

  const payload: Proceso = {
    id: this.id || 0,
    empresa: { id: dto.empresaId, nombre: '' } as any,
    nombre: dto.nombre,
    descripcion: dto.descripcion,
    categoria: dto.categoria,
    estado: dto.estado,
    status: dto.status
  } as any;

  this.loading = true;
  const req = this.id
    ? this.procesoService.actualizarProceso(this.id, payload)
    : this.procesoService.crearProceso(payload);

  req.subscribe({
    next: () => this.router.navigate(['/procesos']),
    error: (err) => { console.error(err); this.error = 'No se pudo guardar'; this.loading = false; }
  });
}

}
