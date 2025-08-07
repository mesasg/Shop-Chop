package com.shopchop.dto;

import com.shopchop.entities.Producto;


public class ProductoDTO {

    private Short id;
    private String nombre;
    private Float precio;

    public ProductoDTO() {}

    public ProductoDTO(Short id, String nombre, Float precio) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }

    public ProductoDTO(Producto producto) {
        this.id = producto.getId();
        this.nombre = producto.getNombre();
        this.precio = producto.getPrecio();
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
        return "ProductoDTO{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", precio=" + precio +
                '}';
    }
}
