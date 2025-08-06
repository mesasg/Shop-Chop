package com.shopchop.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shopchop.dto.PedidoProductoDTO;
import com.shopchop.services.PedidoProductoService;

@RestController
@RequestMapping("/pedido-productos")
public class PedidoProductoController {

    @Autowired
    private PedidoProductoService pedidoProductoService;

    @GetMapping
    public ResponseEntity<List<PedidoProductoDTO>> getAll() {
        return ResponseEntity.ok(pedidoProductoService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PedidoProductoDTO> getById(@PathVariable Long id) {
        PedidoProductoDTO dto = pedidoProductoService.findById(id);
        return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.notFound().build();
    }

    @GetMapping("/pedido/{idPedido}")
    public ResponseEntity<List<PedidoProductoDTO>> getByPedido(@PathVariable Short idPedido) {
        return ResponseEntity.ok(pedidoProductoService.findByPedidoId(idPedido));
    }

    @GetMapping("/producto/{idProducto}")
    public ResponseEntity<List<PedidoProductoDTO>> getByProducto(@PathVariable Short idProducto) {
        return ResponseEntity.ok(pedidoProductoService.findByProductoId(idProducto));
    }

    @PostMapping
    public ResponseEntity<PedidoProductoDTO> create(@RequestBody PedidoProductoDTO dto) {
        PedidoProductoDTO created = pedidoProductoService.save(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        pedidoProductoService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}