package com.shopchop.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shopchop.dto.PedidoProductoDTO;
import com.shopchop.entities.PedidoProducto;
import com.shopchop.repositories.PedidoProductoRepository;
import com.shopchop.repositories.PedidoRepository;
import com.shopchop.repositories.ProductoRepository;
import com.shopchop.services.PedidoProductoService;

@Service
public class PedidoProductoServiceImpl implements PedidoProductoService {

    @Autowired
    private PedidoProductoRepository pedidoProductoRepository;

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private ProductoRepository productoRepository;

    @Override
    public List<PedidoProductoDTO> findAll() {
        return ((List<PedidoProducto>) pedidoProductoRepository.findAll()).stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    public PedidoProductoDTO findById(Long id) {
        return pedidoProductoRepository.findById(id).map(this::toDTO).orElse(null);
    }

    @Override
    public List<PedidoProductoDTO> findByPedidoId(Short idPedido) {
        return pedidoProductoRepository.findByPedido_Id(idPedido).stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    public List<PedidoProductoDTO> findByProductoId(Short idProducto) {
        return pedidoProductoRepository.findByProducto_Id(idProducto).stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    public PedidoProductoDTO save(PedidoProductoDTO pedidoProductoDTO) {
        PedidoProducto pedidoProducto = toEntity(pedidoProductoDTO);
        PedidoProducto saved = pedidoProductoRepository.save(pedidoProducto);
        return toDTO(saved);
    }

    @Override
    public void deleteById(Long id) {
        pedidoProductoRepository.deleteById(id);
    }

    @Override
    public PedidoProductoDTO getPedidoProductoByIds(Short pedidoId, Short productoId) {
        List<PedidoProducto> pedidoProductos = pedidoProductoRepository.findByPedido_IdAndProducto_Id(pedidoId, productoId);

        if (pedidoProductos.isEmpty()) {
            throw new RuntimeException("PedidoProducto no encontrado");
        }

        PedidoProducto pedidoProducto = pedidoProductos.get(0);
        return toDTO(pedidoProducto);
    }

    private PedidoProductoDTO toDTO(PedidoProducto pedidoProducto) {
        PedidoProductoDTO dto = new PedidoProductoDTO();
        dto.setId(pedidoProducto.getId());
        dto.setIdPedido(pedidoProducto.getPedido().getId());
        dto.setIdProducto(pedidoProducto.getProducto().getId());
        dto.setCantidad(pedidoProducto.getCantidad());
        return dto;
    }

    private PedidoProducto toEntity(PedidoProductoDTO pedidoProductoDTO) {
        PedidoProducto pedidoProducto = new PedidoProducto();
        pedidoProducto.setId(pedidoProductoDTO.getId());
        pedidoProducto.setPedido(pedidoRepository.findById(pedidoProductoDTO.getIdPedido()).orElseThrow());
        pedidoProducto.setProducto(productoRepository.findById(pedidoProductoDTO.getIdProducto()).orElseThrow());
        pedidoProducto.setCantidad(pedidoProductoDTO.getCantidad());
        return pedidoProducto;
    }
}