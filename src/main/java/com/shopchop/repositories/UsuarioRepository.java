package com.shopchop.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.shopchop.entities.Usuario;

@Repository
public interface UsuarioRepository extends CrudRepository<Usuario, String>{
}
