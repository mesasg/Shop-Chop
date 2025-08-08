import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthClient } from '../../../auth-client';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionApi{
    private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  public readonly authService = inject(AuthClient);
  
  public readonly errorMessage = signal<string | null>(null);
  
  public readonly loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.errorMessage.set(null);
      
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigate([returnUrl]);
        },
        error: (error) => {
          this.errorMessage.set(error.message || 'Falló la solicitud. Intente nuevamente.');
        }
      });
    }
  }
}

function Injectable(arg0: { providedIn: string; }): (target: typeof AutenticacionApi) => void | typeof AutenticacionApi {
  throw new Error('Function not implemented.');
}
