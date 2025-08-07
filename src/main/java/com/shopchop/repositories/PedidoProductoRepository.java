package com.shopchop.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.shopchop.entities.PedidoProducto;

public interface PedidoProductoRepository extends CrudRepository<PedidoProducto, Long> {
    List<PedidoProducto> findByPedido_Id(Short idPedido);
    List<PedidoProducto> findByProducto_Id(Short idProducto);
    List<PedidoProducto> findByPedido_IdAndProducto_Id(Short pedidoId, Short productoId);
}