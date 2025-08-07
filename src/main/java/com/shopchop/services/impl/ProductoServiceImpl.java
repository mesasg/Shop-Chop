package com.shopchop.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.shopchop.dto.ProductoDTO;
import com.shopchop.entities.Producto;
import com.shopchop.repositories.ProductoRepository;
import com.shopchop.services.ProductoService;

@Service
public class ProductoServiceImpl implements ProductoService {

    private final ProductoRepository productoRepository;

    public ProductoServiceImpl(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    @Override
    public List<ProductoDTO> findAll() {
        return ((List<Producto>) productoRepository.findAll()).stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    public ProductoDTO findById(Short id) {
        return productoRepository.findById(id).map(this::toDTO).orElse(null);
    }

    @Override
    public ProductoDTO save(ProductoDTO productoDTO) {
        Producto producto = toEntity(productoDTO);
        Producto saved = productoRepository.save(producto);
        return toDTO(saved);
    }

    @Override
    public void deleteById(Short id) {
        productoRepository.deleteById(id);
    }

    private ProductoDTO toDTO(Producto producto) {
        ProductoDTO dto = new ProductoDTO();
        dto.setId(producto.getId());
        dto.setNombre(producto.getNombre());
        dto.setPrecio(producto.getPrecio());
        return dto;
    }

    private Producto toEntity(ProductoDTO dto) {
        Producto producto = new Producto();
        producto.setId(dto.getId());
        producto.setNombre(dto.getNombre());
        producto.setPrecio(dto.getPrecio());
        return producto;
    }
}