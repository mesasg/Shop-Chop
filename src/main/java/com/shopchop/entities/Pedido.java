package com.shopchop.entities;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "pedido")
public class Pedido {

    @Id
    @Column(name = "id", nullable = false)
    private Short id;

    @Column(name = "estado", nullable = false)
    private String estado;

    
    @ManyToOne
    @JoinColumn(name = "documentoUsuario", nullable = false)
    @NotNull
    private Usuario usuario;

    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PedidoProducto> productos;

    public Pedido() {}

    public Pedido(Short id, String estado, Usuario usuario) {
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

    public List<PedidoProducto> getProductos() {
        return productos;
    }

    public void setProductos(List<PedidoProducto> productos) {
        this.productos = productos;
    }
}