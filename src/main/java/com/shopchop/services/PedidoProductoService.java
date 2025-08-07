package com.shopchop.services;

import java.util.List;

import com.shopchop.dto.PedidoProductoDTO;

public interface PedidoProductoService {
    List<PedidoProductoDTO> findAll();
    PedidoProductoDTO findById(Long id);
    List<PedidoProductoDTO> findByPedidoId(Short idPedido);
    List<PedidoProductoDTO> findByProductoId(Short idProducto);
    PedidoProductoDTO save(PedidoProductoDTO pedidoProductoDTO);
    void deleteById(Long id);
    PedidoProductoDTO getPedidoProductoByIds(Short pedidoId, Short productoId);
}