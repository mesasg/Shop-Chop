package com.shopchop.dto;

import com.shopchop.entities.Pedido;

public class PedidoDTO {

    private Short id;
    private String estado;
    private String documentoUsuario;

    public PedidoDTO() {}

    public PedidoDTO(Short id, String estado, String documentoUsuario) {
        this.id = id;
        this.estado = estado;
        this.documentoUsuario = documentoUsuario;
    }

    public PedidoDTO(Pedido pedido) {
        this.id = pedido.getId();
        this.estado = pedido.getEstado();
        this.documentoUsuario = pedido.getUsuario() != null ? pedido.getUsuario().getDocumento() : null;
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

    public String getDocumentoUsuario() {
        return documentoUsuario;
    }

    public void setDocumentoUsuario(String documentoUsuario) {
        this.documentoUsuario = documentoUsuario;
    }

    @Override
    public String toString() {
        return "PedidoDTO{" +
                "id=" + id +
                ", estado='" + estado + '\'' +
                ", documentoUsuario='" + documentoUsuario + '\'' +
                '}';
    }
}
