package com.shopchop.dto;

public class PedidoProductoDTO {

    private Long id;
    private Short idPedido;
    private Short idProducto;
    private int cantidad;

    public PedidoProductoDTO() {}

    public PedidoProductoDTO(Long id, Short idPedido, Short idProducto, int cantidad) {
        this.id = id;
        this.idPedido = idPedido;
        this.idProducto = idProducto;
        this.cantidad = cantidad;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Short getIdPedido() {
        return idPedido;
    }

    public void setIdPedido(Short idPedido) {
        this.idPedido = idPedido;
    }

    public Short getIdProducto() {
        return idProducto;
    }

    public void setIdProducto(Short idProducto) {
        this.idProducto = idProducto;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }
}