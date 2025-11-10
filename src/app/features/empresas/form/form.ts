import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { Empresa } from '../../../core/models/empresa.interface';
import { EmpresaService } from '../../../core/services/empresas/empresa';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class Form {
  id!: number;
  form!: FormGroup;
  loading = false; error?: string;

  constructor(
    private fb: FormBuilder,
    private empresaService: EmpresaService,
    private route: ActivatedRoute,
    private router: Router
  ){
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      nit: ['', Validators.required],
      correoContacto: ['', [Validators.required, Validators.email]],
      status: [0],
    });

    if (this.id) {
      this.loading = true;
      this.empresaService.obtenerPorId(this.id).subscribe({
        next: (e) => { this.form.patchValue(e); this.loading = false; },
        error: _ => { this.error = 'No se pudo cargar la empresa'; this.loading = false; }
      });
    }
  }

  guardar(){
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }

    const payload: Empresa = { id: this.id || 0, ...this.form.value } as Empresa;

    this.loading = true;
    const req = this.id
      ? this.empresaService.actualizarEmpresa(this.id, payload)
      : this.empresaService.crearEmpresa(payload);

    req.subscribe({
      next: () => this.router.navigate(['/empresas']),
      error: _ => { this.error = 'No se pudo guardar'; this.loading = false; }
    });
  }
}