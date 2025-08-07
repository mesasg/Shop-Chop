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

import com.shopchop.dto.ProductoDTO;
import com.shopchop.dto.RecetaDTO;
import com.shopchop.services.RecetaService;

@RestController
@RequestMapping("/recetas")
public class RecetaController {

    @Autowired
    private RecetaService recetaService;

    @GetMapping
    public ResponseEntity<List<RecetaDTO>> getAllRecetas() {
        List<RecetaDTO> recetas = recetaService.findAll();
        return ResponseEntity.ok(recetas);
    }

    @PostMapping
    public ResponseEntity<RecetaDTO> createReceta(@RequestBody RecetaDTO recetaDTO) {
        RecetaDTO created = recetaService.save(recetaDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RecetaDTO> updateReceta(@PathVariable short id, @RequestBody RecetaDTO recetaDTO) {
        RecetaDTO updated = recetaService.update(id, recetaDTO);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReceta(@PathVariable short id) {
        recetaService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/usuario/{documento}")
    public ResponseEntity<List<RecetaDTO>> getRecetasByUsuario(@PathVariable String documento) {
        List<RecetaDTO> recetas = recetaService.findByUsuario(documento);
        return ResponseEntity.ok(recetas);
    }

    @GetMapping("/{id}/productos")
    public ResponseEntity<List<ProductoDTO>> getProductosByRecetaId(@PathVariable Short id) {
        List<ProductoDTO> productos = recetaService.findProductosByRecetaId(id);
        if (productos != null && !productos.isEmpty()) {
            return ResponseEntity.ok(productos);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}