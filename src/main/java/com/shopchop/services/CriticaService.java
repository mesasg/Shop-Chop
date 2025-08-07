package com.shopchop.services;

import java.util.List;

import com.shopchop.dto.CriticaDTO;

public interface CriticaService {
    List<CriticaDTO> findAll();
    CriticaDTO save(CriticaDTO dto);
    CriticaDTO update(Short id, CriticaDTO dto);
    void delete(Short id);
    List<CriticaDTO> findByUsuario(String documentoUsuario);
    List<CriticaDTO> findByReceta(Short idReceta);
}