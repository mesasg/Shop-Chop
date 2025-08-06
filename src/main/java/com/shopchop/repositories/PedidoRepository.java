package com.shopchop.repositories;

import org.springframework.data.repository.CrudRepository;

import com.shopchop.entities.Pedido;

public interface PedidoRepository extends CrudRepository<Pedido, Short> {
}