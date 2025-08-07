package com.shopchop.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.shopchop.entities.RecetaProducto;

@Repository
public interface RecetaProductoRepository extends CrudRepository<RecetaProducto, Long> {
}