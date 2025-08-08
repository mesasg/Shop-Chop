package com.shopchop.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.shopchop.dto.AuthResponse;
import com.shopchop.dto.LoginRequest;
import com.shopchop.dto.UsuarioDTO;
import com.shopchop.security.JwtUtil;
import com.shopchop.services.UsuarioService;

@RestController
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;
    
    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping("/usuarios")
    public List<UsuarioDTO> getUsuarios(@RequestParam(required = false) String param) {
        return usuarioService.findAll();
    }
    
    @PostMapping("/usuarios")
    public ResponseEntity<UsuarioDTO> createUsuario(@RequestBody UsuarioDTO usuarioDTO) {
        UsuarioDTO createdUsuario = usuarioService.save(usuarioDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUsuario);
    }

    @PutMapping("/usuarios/{documento}")
    public ResponseEntity<UsuarioDTO> updateUsuario(@PathVariable String documento, @RequestBody UsuarioDTO usuarioDTO) {
        UsuarioDTO updatedUsuario = usuarioService.update(documento, usuarioDTO);
        return ResponseEntity.ok(updatedUsuario);
    }

    @DeleteMapping("/{documento}")
    public ResponseEntity<Void> deleteCritica(@PathVariable String documento) {
        usuarioService.delete(documento);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthResponse> authenticateUser(@RequestBody LoginRequest loginRequest) {
        try {
            System.out.println("loginRequest");
            if (loginRequest.getCorreo() == null || loginRequest.getPassword() == null) {
                return ResponseEntity.badRequest().build();
            }

            UsuarioDTO authenticatedUser = usuarioService.authenticateUser(
                loginRequest.getCorreo(), 
                loginRequest.getPassword()
            );

            if (authenticatedUser != null) {
                String token = jwtUtil.generateToken(
                    authenticatedUser.getCorreo()
                );
                
                AuthResponse authResponse = new AuthResponse(
                    token, 
                    authenticatedUser.getCorreo()
                );
                
                return ResponseEntity.ok(authResponse);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // 401 Unauthorized
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
