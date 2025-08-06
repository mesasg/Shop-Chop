package com.shopchop.repositories;

import org.springframework.data.repository.CrudRepository;

import com.shopchop.entities.Producto;

public interface ProductoRepository extends CrudRepository<Producto, Short> {
}