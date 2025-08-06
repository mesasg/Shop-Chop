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

import com.shopchop.dto.RecetaProductoDTO;
import com.shopchop.services.RecetaProductoService;

@RestController
@RequestMapping("/recetas-productos")
public class RecetaProductoController {

    @Autowired
    private RecetaProductoService recetaProductoService;


    @GetMapping
    public ResponseEntity<List<RecetaProductoDTO>> getAll() {
        List<RecetaProductoDTO> recetasProductos = recetaProductoService.findAll();
        return ResponseEntity.ok(recetasProductos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RecetaProductoDTO> getById(@PathVariable Long id) {
        RecetaProductoDTO recetaProducto = recetaProductoService.findById(id);
        if (recetaProducto != null) {
            return ResponseEntity.ok(recetaProducto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<RecetaProductoDTO> createRecetaProducto(@RequestBody RecetaProductoDTO recetaProductoDTO) {
        RecetaProductoDTO savedRecetaProducto = recetaProductoService.save(recetaProductoDTO);
        return new ResponseEntity<>(savedRecetaProducto, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RecetaProductoDTO> updateRecetaProducto(@PathVariable Long id, @RequestBody RecetaProductoDTO recetaProductoDTO) {
        recetaProductoDTO.setId(id);
        RecetaProductoDTO updatedRecetaProducto = recetaProductoService.save(recetaProductoDTO);
        if (updatedRecetaProducto != null) {
            return ResponseEntity.ok(updatedRecetaProducto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecetaProducto(@PathVariable Long id) {
        recetaProductoService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}