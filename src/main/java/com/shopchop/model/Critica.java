package com.shopchop.model;

public class Critica {

    private int id;
    private String comentario;
    private Usuario usuario;
    private Receta receta;

    public Critica(int id, String comentario, Usuario usuario, Receta receta) {
        this.id = id;
        this.comentario = comentario;
        this.usuario = usuario;
        this.receta = receta;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
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
}
