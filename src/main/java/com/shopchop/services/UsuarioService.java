package com.shopchop.services;

import java.util.List;

import com.shopchop.dto.UsuarioDTO;

public interface UsuarioService {
    List<UsuarioDTO> findAll();
    UsuarioDTO save(UsuarioDTO usuarioDTO);
    UsuarioDTO update(String documento, UsuarioDTO usuarioDTO);
    void delete(String documento);
    public UsuarioDTO authenticateUser(String username, String password);
}
