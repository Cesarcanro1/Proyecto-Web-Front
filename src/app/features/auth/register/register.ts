import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  form!: FormGroup;
  loading = false; error?: string; success?: string;
  private readonly signupUrl = 'http://backend.10.43.103.143.nip.io/api/public/signup';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.form = this.fb.group({
      empresaNombre: ['', Validators.required],
      empresaNit: ['', Validators.required],
      empresaCorreo: ['', [Validators.required, Validators.email]],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submit(){
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.error = undefined; this.success = undefined; this.loading = true;

    const v = this.form.value;
    const payload = {
      empresa: { nombre: v.empresaNombre, nit: v.empresaNit, correoContacto: v.empresaCorreo },
      usuario: { nombres: v.nombres, apellidos: v.apellidos, email: v.email, password: v.password }
    };

    this.http.post(this.signupUrl, payload).subscribe({
      next: _ => {
        this.success = 'Cuenta creada. Ahora inicia sesión 👌';
        this.loading = false;
        setTimeout(() => this.router.navigate(['/login']), 800);
      },
      error: (e) => {
        this.error = e?.error || 'No se pudo registrar';
        this.loading = false;
      }
    });
  }
}
