package com.shopchop.model;

public class Usuario {

    private String documento;
    private String nombre;
    private String celular;
    private String direccion;
    private String correo;
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
}

