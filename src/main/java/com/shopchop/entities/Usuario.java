package com.shopchop.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "Usuario")
public class Usuario {

    @Id
    @Column(name = "documento", length = 10, nullable = false)
    @NotNull
    @Size(max = 10)
    private String documento;

    @Column(name = "nombre", length = 50, nullable = false)
    @NotNull
    @Size(max = 50)
    private String nombre;

    @Column(name = "celular", length = 10, nullable = false)
    @NotNull
    @Size(max = 10)
    private String celular;

    @Column(name = "direccion", length = 50, nullable = false)
    @NotNull
    @Size(max = 50)
    private String direccion;

    @Column(name = "correo", length = 50)
    @Size(max = 50)
    private String correo;

    @Column(name = "contraseña", length = 100)
    @Size(max = 100)
    private String contraseña;

    public Usuario() {}

    public Usuario(String documento, String nombre, String celular, String direccion, String correo, String contraseña) {
        this.documento = documento;
        this.nombre = nombre;
        this.celular = celular;
        this.direccion = direccion;
        this.correo = correo;
        this.contraseña = contraseña;
    }

    public String getDocumento() {
        return documento;
    }

    public void setDocumento(String documento) {
        this.documento = documento;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCelular() {
        return celular;
    }

    public void setCelular(String celular) {
        this.celular = celular;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getContraseña() {
        return contraseña;
    }

    public void setContraseña(String contraseña) {
        this.contraseña = contraseña;
    }

    @Override
    public String toString() {
        return "Usuario{" +
                "documento='" + documento + '\'' +
                ", nombre='" + nombre + '\'' +
                ", celular='" + celular + '\'' +
                ", direccion='" + direccion + '\'' +
                ", correo='" + correo + '\'' +
                ", contraseña='" + contraseña + '\'' +
                '}';
    }
}