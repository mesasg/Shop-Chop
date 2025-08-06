package com.shopchop.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shopchop.dto.PedidoDTO;
import com.shopchop.entities.Pedido;
import com.shopchop.repositories.PedidoRepository;
import com.shopchop.repositories.UsuarioRepository;
import com.shopchop.services.PedidoService;

@Service
public class PedidoServiceImpl implements PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public List<PedidoDTO> findAll() {
        return ((List<Pedido>) pedidoRepository.findAll()).stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    public PedidoDTO findById(Short id) {
        return pedidoRepository.findById(id).map(this::toDTO).orElse(null);
    }

    @Override
    public PedidoDTO save(PedidoDTO pedidoDTO) {
        Pedido pedido = toEntity(pedidoDTO);
        Pedido saved = pedidoRepository.save(pedido);
        return toDTO(saved);
    }

    @Override
    public void deleteById(Short id) {
        pedidoRepository.deleteById(id);
    }

    private PedidoDTO toDTO(Pedido pedido) {
        PedidoDTO pedidoDTO = new PedidoDTO();
        pedidoDTO.setId(pedido.getId());
        pedidoDTO.setEstado(pedido.getEstado());
        pedidoDTO.setDocumentoUsuario(pedido.getUsuario().getDocumento());
        return pedidoDTO;
    }

    private Pedido toEntity(PedidoDTO pedidoDTO) {
        Pedido pedido = new Pedido();
        pedido.setId(pedidoDTO.getId());
        pedido.setEstado(pedidoDTO.getEstado());
        pedido.setUsuario(usuarioRepository.findById(pedidoDTO.getDocumentoUsuario()).orElseThrow());
        return pedido;
    }
}