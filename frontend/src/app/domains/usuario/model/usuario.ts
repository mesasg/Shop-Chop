export interface Usuario {
    documento: string;
    nombre: string;
    celular: string;
    correo: string;
    direccion: string;
    contraseña: string;
}

export interface UsuarioDTO{
    documento: string;
    nombre: string;
    celular: string;
    correo: string;
    direccion: string;
    contraseña: string;
}

export interface LoginRequest {
  correo: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  correo: string;
  documento: string;
  nombre: string;
    celular: string;
    direccion: string;
    contraseña: string;
}