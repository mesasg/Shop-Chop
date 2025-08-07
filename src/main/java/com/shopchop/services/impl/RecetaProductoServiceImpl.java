package com.shopchop.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shopchop.dto.RecetaProductoDTO;
import com.shopchop.entities.RecetaProducto;
import com.shopchop.repositories.ProductoRepository;
import com.shopchop.repositories.RecetaProductoRepository;
import com.shopchop.repositories.RecetaRepository;
import com.shopchop.services.RecetaProductoService;

@Service
public class RecetaProductoServiceImpl implements RecetaProductoService {

    @Autowired
    private RecetaProductoRepository recetaProductoRepository;

    @Autowired
    private ProductoRepository productoRepository;
    
    @Autowired
    private RecetaRepository recetaRepository;

    @Override
    public List<RecetaProductoDTO> findAll() {
        return ((List<RecetaProducto>) recetaProductoRepository.findAll())
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public RecetaProductoDTO findById(Long id) {
        return recetaProductoRepository.findById(id)
                .map(this::convertToDto)
                .orElse(null);
    }

    @Override
    public RecetaProductoDTO save(RecetaProductoDTO recetaProductoDTO) {
        RecetaProducto recetaProducto = convertToEntity(recetaProductoDTO);
        RecetaProducto savedRecetaProducto = recetaProductoRepository.save(recetaProducto);
        return convertToDto(savedRecetaProducto);
    }

    @Override
    public void deleteById(Long id) {
        recetaProductoRepository.deleteById(id);
    }

    private RecetaProductoDTO convertToDto(RecetaProducto recetaProducto) {
        RecetaProductoDTO recetaProductoDTO = new RecetaProductoDTO();
        recetaProductoDTO.setId(recetaProducto.getId());
        recetaProductoDTO.setRecetaId(recetaProducto.getReceta().getId());
        recetaProductoDTO.setProductoId(recetaProducto.getProducto().getId());
        recetaProductoDTO.setCantidad(recetaProducto.getCantidad());
        return recetaProductoDTO;
    }

    private RecetaProducto convertToEntity(RecetaProductoDTO recetaProductoDTO) {
        RecetaProducto recetaProducto = new RecetaProducto();
        recetaProducto.setId(recetaProductoDTO.getId());
        recetaProducto.setReceta(recetaRepository.findById(recetaProductoDTO.getRecetaId()).orElseThrow());
        recetaProducto.setProducto(productoRepository.findById(recetaProductoDTO.getProductoId()).orElseThrow());
        recetaProducto.setCantidad(recetaProductoDTO.getCantidad());
        return new RecetaProducto();
    }
}