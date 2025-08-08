package com.shopchop.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.shopchop.dto.UsuarioDTO;
import com.shopchop.entities.Usuario;
import com.shopchop.repositories.UsuarioRepository;
import com.shopchop.services.UsuarioService;

@Service
public class UsuarioServiceImpl implements  UsuarioService {
    
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Override
    public List<UsuarioDTO> findAll(){
        List<Usuario> all = (List<Usuario>) usuarioRepository.findAll();
        return all.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Override
    public UsuarioDTO save(UsuarioDTO usuarioDTO){
        Usuario usuario = convertToEntity(usuarioDTO);
        if (usuarioDTO.getContraseña() != null && !usuarioDTO.getContraseña().isEmpty()) {
            usuario.setContraseña(passwordEncoder.encode(usuarioDTO.getContraseña()));
        }
        Usuario savedUsuario = usuarioRepository.save(usuario);
        return convertToDTO(savedUsuario);
    }

    @Override
    public UsuarioDTO update(String documento, UsuarioDTO usuarioDTO) {
        Usuario usuario = usuarioRepository.findById(documento).orElseThrow(() -> new RuntimeException("Usuario not found with id: " + documento));
        if (usuarioDTO.getNombre() != null) {
            usuario.setNombre(usuarioDTO.getNombre());
        }
        if (usuarioDTO.getCelular() != null) {
            usuario.setCelular(usuarioDTO.getCelular());
        }
        if (usuarioDTO.getDireccion() != null) {
            usuario.setDireccion(usuarioDTO.getDireccion());
        }
        if (usuarioDTO.getCorreo() != null) {
            usuario.setCorreo(usuarioDTO.getCorreo());
        }
        if (usuarioDTO.getContraseña() != null) {
            usuario.setContraseña(usuarioDTO.getContraseña());
        }
        Usuario updatedUsuario = usuarioRepository.save(usuario);
        return convertToDTO(updatedUsuario);
    }

    @Override
    public void delete(String documento){
        usuarioRepository.deleteById(documento);
    }
    
    @Override
    public UsuarioDTO authenticateUser(String username, String password) {
        Optional<Usuario> user = usuarioRepository.findByCorreo(username);
        System.out.println("Authenticating user: " + username);
        if (user.isPresent() && passwordEncoder.matches(password, user.get().getContraseña())) {
            System.out.println("User authenticated successfully: " + user.get().getCorreo());
            return convertToDTO(user.get());
        }
        return null;
    }

    private UsuarioDTO convertToDTO(Usuario usuario){
        return new UsuarioDTO(usuario);
    }

    private Usuario convertToEntity(UsuarioDTO usuarioDTO){
        Usuario usuario = new Usuario();
        usuario.setDocumento(usuarioDTO.getDocumento());
        usuario.setNombre(usuarioDTO.getNombre());
        usuario.setCelular(usuarioDTO.getCelular());
        usuario.setDireccion(usuarioDTO.getDireccion());
        usuario.setCorreo(usuarioDTO.getCorreo());
        usuario.setContraseña(usuarioDTO.getContraseña());
        return usuario;
    }
}
