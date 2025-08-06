package com.shopchop.services;

import java.util.List;

import com.shopchop.dto.RecetaProductoDTO;

public interface RecetaProductoService {
    List<RecetaProductoDTO> findAll();
    RecetaProductoDTO findById(Long id);
    RecetaProductoDTO save(RecetaProductoDTO recetaProductoDTO);
    void deleteById(Long id);
}