package com.shopchop.dto;

public class RecetaProductoDTO {

    private Long id;
    private short recetaId;
    private short productoId;
    private Integer cantidad;

    public RecetaProductoDTO() {}

    public RecetaProductoDTO(Long id, short recetaId, short productoId, Integer cantidad) {
        this.id = id;
        this.recetaId = recetaId;
        this.productoId = productoId;
        this.cantidad = cantidad;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public short getRecetaId() {
        return recetaId;
    }

    public void setRecetaId(short recetaId) {
        this.recetaId = recetaId;
    }

    public short getProductoId() {
        return productoId;
    }

    public void setProductoId(short productoId) {
        this.productoId = productoId;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }
}