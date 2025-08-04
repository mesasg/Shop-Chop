package com.shopchop.dto;

import com.shopchop.entities.Receta;

public class RecetaDTO {

    private Short id;
    private String nombre;
    private String descripcion;
    private byte[] foto;
    private String documentoUsuario;

    // Constructor vacío
    public RecetaDTO() {}

    // Constructor completo
    public RecetaDTO(Short id, String nombre, String descripcion, byte[] foto, String documentoUsuario) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.foto = foto;
        this.documentoUsuario = documentoUsuario;
    }

    // Constructor que recibe una entidad Receta
    public RecetaDTO(Receta receta) {
        this.id = receta.getId();
        this.nombre = receta.getNombre();
        this.descripcion = receta.getDescripcion();
        this.foto = receta.getFoto();
        this.documentoUsuario = receta.getUsuario() != null ? receta.getUsuario().getDocumento() : null;
    }

    // Getters y Setters
    public Short getId() {
        return id;
    }

    public void setId(Short id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public byte[] getFoto() {
        return foto;
    }

    public void setFoto(byte[] foto) {
        this.foto = foto;
    }

    public String getDocumentoUsuario() {
        return documentoUsuario;
    }

    public void setDocumentoUsuario(String documentoUsuario) {
        this.documentoUsuario = documentoUsuario;
    }

    @Override
    public String toString() {
        return "RecetaDTO{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", descripcion='" + descripcion + '\'' +
                ", foto=" + (foto != null ? foto.length + " bytes" : "null") +
                ", documentoUsuario='" + documentoUsuario + '\'' +
                '}';
    }
}
