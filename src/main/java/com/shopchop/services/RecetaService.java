package com.shopchop.services;

import java.util.List;

import com.shopchop.dto.ProductoDTO;
import com.shopchop.dto.RecetaDTO;

public interface RecetaService {
    List<RecetaDTO> findAll();
    RecetaDTO save(RecetaDTO recetaDTO);
    RecetaDTO update(short id, RecetaDTO recetaDTO);
    void delete(short id);
    List<RecetaDTO> findByUsuario(String documentoUsuario);
    List<ProductoDTO> findProductosByRecetaId(Short recetaId);
}
