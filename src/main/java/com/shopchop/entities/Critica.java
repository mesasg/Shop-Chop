package com.shopchop.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "Critica")
public class Critica {

    @Id
    @Column(name = "id", nullable = false)
    private Short id;

    @Column(name = "comentario", columnDefinition = "TEXT", nullable = false)
    @NotNull
    private String comentario;

    @ManyToOne
    @JoinColumn(name = "documentoUsuario", nullable = false)
    @NotNull
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "IDReceta", nullable = false)
    @NotNull
    private Receta receta;

    public Critica() {}

    public Critica(Short id, String comentario, Usuario usuario, Receta receta) {
        this.id = id;
        this.comentario = comentario;
        this.usuario = usuario;
        this.receta = receta;
    }

    public Short getId() {
        return id;
    }

    public void setId(Short id) {
        this.id = id;
    }

    public String getComentario() {
        return comentario;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Receta getReceta() {
        return receta;
    }

    public void setReceta(Receta receta) {
        this.receta = receta;
    }

    @Override
    public String toString() {
        return "Critica{" +
                "id=" + id +
                ", comentario='" + comentario + '\'' +
                ", usuario=" + (usuario != null ? usuario.getDocumento() : "null") +
                ", receta=" + (receta != null ? receta.getId() : "null") +
                '}';
    }
}
