package com.shopchop.repositories;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.shopchop.entities.Usuario;

@Repository
public interface UsuarioRepository extends CrudRepository<Usuario, String>{
    Optional<Usuario> findByCorreo(String Correo);
}
