package com.shopchop.entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "Receta")
public class Receta {

    @Id
    @Column(name = "ID", nullable = false)
    private Short id;

    @Column(name = "nombre", length = 40)
    @Size(max = 40)
    private String nombre;

    @Column(name = "descripcion", columnDefinition = "TEXT", nullable = false)
    @NotNull
    private String descripcion;

    @Lob
    @Column(name = "foto", nullable = false)
    @NotNull
    private byte[] foto;

    @ManyToOne
    @JoinColumn(name = "documentoUsuario", nullable = false)
    @NotNull
    private Usuario usuario;

    @OneToMany(mappedBy = "receta", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RecetaProducto> recetaProducto = new ArrayList<>();

    public Receta() {}

    public Receta(Short id, String nombre, String descripcion, byte[] foto, Usuario usuario) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.foto = foto;
        this.usuario = usuario;
    }

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

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public List<RecetaProducto> getRecetaProducto() {
        return recetaProducto;
    }

    public void setRecetaProducto(List<RecetaProducto> recetaProducto) {
        this.recetaProducto = recetaProducto;
    }

    @Override
    public String toString() {
        return "Receta{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", descripcion='" + descripcion + '\'' +
                ", foto=" + (foto != null ? foto.length + " bytes" : "null") +
                ", usuario=" + (usuario != null ? usuario.getDocumento() : "null") +
                '}';
    }
}

