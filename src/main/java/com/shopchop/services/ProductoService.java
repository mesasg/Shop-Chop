package com.shopchop.services;

import java.util.List;

import com.shopchop.dto.ProductoDTO;

public interface ProductoService {
    List<ProductoDTO> findAll();
    ProductoDTO findById(Short id);
    ProductoDTO save(ProductoDTO productoDTO);
    void deleteById(Short id);
}