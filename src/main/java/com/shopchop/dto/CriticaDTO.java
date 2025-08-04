package com.shopchop.dto;

import com.shopchop.entities.Critica;

public class CriticaDTO {

    private Short id;
    private String comentario;
    private String documentoUsuario;
    private Short idReceta;

    public CriticaDTO() {}

    public CriticaDTO(Short id, String comentario, String documentoUsuario, Short idReceta) {
        this.id = id;
        this.comentario = comentario;
        this.documentoUsuario = documentoUsuario;
        this.idReceta = idReceta;
    }

    public CriticaDTO(Critica critica) {
        this.id = critica.getId();
        this.comentario = critica.getComentario();
        this.documentoUsuario = critica.getUsuario() != null ? critica.getUsuario().getDocumento() : null;
        this.idReceta = critica.getReceta() != null ? critica.getReceta().getId() : null;
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

    public String getDocumentoUsuario() {
        return documentoUsuario;
    }

    public void setDocumentoUsuario(String documentoUsuario) {
        this.documentoUsuario = documentoUsuario;
    }

    public Short getIdReceta() {
        return idReceta;
    }

    public void setIdReceta(Short idReceta) {
        this.idReceta = idReceta;
    }

    @Override
    public String toString() {
        return "CriticaDTO{" +
                "id=" + id +
                ", comentario='" + comentario + '\'' +
                ", documentoUsuario='" + documentoUsuario + '\'' +
                ", idReceta=" + idReceta +
                '}';
    }
}
