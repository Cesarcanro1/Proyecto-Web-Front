import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { Empresa } from '../../../core/models/empresa.interface';
import { Usuario } from '../../../core/models/usuario.interface';
import { EmpresaService } from '../../../core/services/empresas/empresa';
import { UsuarioService } from '../../../core/services/usuarios/usuario';

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
    private usuarioService: UsuarioService,
    private empresaService: EmpresaService,
    private route: ActivatedRoute,
    private router: Router
  ){
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.form = this.fb.group({
      empresaId: [null, Validators.required],
      nombres: ['', [Validators.required, Validators.minLength(2)]],
      apellidos: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [this.id ? Validators.minLength(6) : Validators.required, Validators.minLength(6)]],
      status: [0],
    });

    // Cargar empresas para el select
    this.empresaService.obtenerTodos().subscribe({
      next: (e) => this.empresas = e,
      error: _ => this.error = 'No se pudieron cargar las empresas'
    });

    // Si es edición, cargar usuario
    if (this.id) {
      this.loading = true;
      this.usuarioService.obtenerPorId(this.id).subscribe({
        next: (u) => {
          this.form.patchValue({
            empresaId: u.empresa?.id ?? null,
            nombres: u.nombres,
            apellidos: u.apellidos,
            email: u.email,
            password: '',       // por seguridad no mostramos hash
            status: u.status ?? 0
          });
          this.loading = false;
        },
        error: _ => { this.error = 'No se pudo cargar el usuario'; this.loading = false; }
      });
    }
  }

  guardar(){
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }

    const v = this.form.value;

    const payload: Usuario = {
      id: this.id || 0,
      empresa: { id: v.empresaId, nombre: '' } as any,
      nombres: v.nombres!,
      apellidos: v.apellidos!,
      email: v.email!,
      password: v.password || '',
      status: v.status ?? 0,
    };

    this.loading = true;
    const req = this.id
      ? this.usuarioService.actualizarUsuario(this.id, payload)
      : this.usuarioService.crearUsuario(payload);

    req.subscribe({
      next: () => this.router.navigate(['/usuarios']),
      error: (e) => {
        console.error(e);
        this.error = e?.status === 409 ? 'El correo ya existe' : 'No se pudo guardar';
        this.loading = false;
      }
    });
  }
}
