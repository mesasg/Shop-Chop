package com.shopchop.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.shopchop.entities.Critica;

public interface CriticaRepository extends CrudRepository<Critica, Short> {
    List<Critica> findByUsuario_Documento(String documentoUsuario);
    List<Critica> findByReceta_Id(Short idReceta);
}