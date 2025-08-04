package com.shopchop.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "Pedido")
public class Pedido {

    @Id
    @Column(name = "ID", nullable = false)
    private Short id;

    @Column(name = "estado", length = 10, nullable = false)
    @NotBlank
    private String estado;

    @ManyToOne
    @JoinColumn(name = "documentoUsuario", nullable = false)
    @NotNull
    private Usuario usuario;

    public Pedido() {}

    public Pedido(Short id, String estado, Usuario usuario) {
        this.id = id;
        this.estado = estado;
        this.usuario = usuario;
    }

    public Short getId() {
        return id;
    }

    public void setId(Short id) {
        this.id = id;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    @Override
    public String toString() {
        return "Pedido{" +
                "id=" + id +
                ", estado='" + estado + '\'' +
                ", usuario=" + (usuario != null ? usuario.getDocumento() : "null") +
                '}';
    }
}
