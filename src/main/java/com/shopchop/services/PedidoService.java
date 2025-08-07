package com.shopchop.services;

import java.util.List;

import com.shopchop.dto.PedidoDTO;

public interface PedidoService {
    List<PedidoDTO> findAll();
    PedidoDTO findById(Short id);
    PedidoDTO save(PedidoDTO pedidoDTO);
    void deleteById(Short id);
}