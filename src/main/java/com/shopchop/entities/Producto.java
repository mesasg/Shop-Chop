package com.shopchop.entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "Producto")
public class Producto {

    @Id
    @Column(name = "id", nullable = false)
    private Short id;

    @Column(name = "nombre", length = 20, nullable = false)
    @NotNull
    @Size(max = 20)
    private String nombre;

    @Column(name = "precio", nullable = false)
    @NotNull
    @DecimalMin(value = "0.0", inclusive = false)
    private Float precio;
    
    @OneToMany(mappedBy = "producto", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PedidoProducto> pedidos = new ArrayList<>();

    public Producto() {}

    public Producto(Short id, String nombre, Float precio) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }
    
    public List<PedidoProducto> getPedidos() {
        return pedidos;
    }

    public void setPedidos(List<PedidoProducto> pedidos) {
        this.pedidos = pedidos;
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

    public Float getPrecio() {
        return precio;
    }

    public void setPrecio(Float precio) {
        this.precio = precio;
    }

    @Override
    public String toString() {
        return "Producto{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", precio=" + precio +
                '}';
    }
}