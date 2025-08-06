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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shopchop.dto.CriticaDTO;
import com.shopchop.services.CriticaService;

@RestController
@RequestMapping("/criticas")
public class CriticaController {

    @Autowired
    private CriticaService criticaService;

    @GetMapping
    public ResponseEntity<List<CriticaDTO>> getAllCriticas() {
        List<CriticaDTO> criticas = criticaService.findAll();
        return ResponseEntity.ok(criticas);
    }

    @PostMapping
    public ResponseEntity<CriticaDTO> createCritica(@RequestBody CriticaDTO dto) {
        CriticaDTO created = criticaService.save(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CriticaDTO> updateCritica(@PathVariable Short id, @RequestBody CriticaDTO dto) {
        CriticaDTO updated = criticaService.update(id, dto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCritica(@PathVariable Short id) {
        criticaService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/usuario/{documento}")
    public ResponseEntity<List<CriticaDTO>> getCriticasByUsuario(@PathVariable String documento) {
        List<CriticaDTO> criticas = criticaService.findByUsuario(documento);
        return ResponseEntity.ok(criticas);
    }

    @GetMapping("/receta/{idReceta}")
    public ResponseEntity<List<CriticaDTO>> getCriticasByReceta(@PathVariable Short idReceta) {
        List<CriticaDTO> criticas = criticaService.findByReceta(idReceta);
        return ResponseEntity.ok(criticas);
    }
}