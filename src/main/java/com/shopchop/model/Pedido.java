package com.shopchop.model;

public class Pedido {

    private int id;
    private String estado;
    private Usuario usuario;

    public Pedido(int id, String estado, Usuario usuario) {
        this.id = id;
        this.estado = estado;
        this.usuario = usuario;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
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
}
