package com.shopchop.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.shopchop.entities.Receta;
import com.shopchop.entities.Usuario;

@Repository
public interface RecetaRepository extends CrudRepository<Receta, Short>{
    List<Receta> findByUsuario(Usuario usuario);

}
