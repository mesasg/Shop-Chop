package com.shopchop.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shopchop.dto.ProductoDTO;
import com.shopchop.dto.RecetaDTO;
import com.shopchop.entities.Receta;
import com.shopchop.entities.RecetaProducto;
import com.shopchop.entities.Usuario;
import com.shopchop.repositories.RecetaRepository;
import com.shopchop.repositories.UsuarioRepository;
import com.shopchop.services.RecetaService;

@Service
public class RecetaServiceImpl implements RecetaService {

    @Autowired
    private RecetaRepository recetaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public List<RecetaDTO> findAll() {
        List<Receta> recetas = (List<Receta>) recetaRepository.findAll();
        return recetas.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Override
    public RecetaDTO save(RecetaDTO recetaDTO) {
        Receta receta = convertToEntity(recetaDTO);
        Receta savedReceta = recetaRepository.save(receta);
        return convertToDTO(savedReceta);
    }

    @Override
    public RecetaDTO update(short id, RecetaDTO recetaDTO) {
        Receta receta = recetaRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Receta not found with id: " + id));

        if (recetaDTO.getNombre() != null) {
            receta.setNombre(recetaDTO.getNombre());
        }
        if (recetaDTO.getDescripcion() != null) {
            receta.setDescripcion(recetaDTO.getDescripcion());
        }
        if (recetaDTO.getFoto() != null) {
            receta.setFoto(recetaDTO.getFoto());
        }
        if (recetaDTO.getDocumentoUsuario() != null) {
            Usuario usuario = usuarioRepository.findById(recetaDTO.getDocumentoUsuario())
                .orElseThrow(() -> new RuntimeException("Usuario not found with documento: " + recetaDTO.getDocumentoUsuario()));
            receta.setUsuario(usuario);
        }

        Receta updatedReceta = recetaRepository.save(receta);
        return convertToDTO(updatedReceta);
    }

    @Override
    public void delete(short id) {
        recetaRepository.deleteById(id);
    }

    @Override
    public List<RecetaDTO> findByUsuario(String documentoUsuario) {
        Usuario usuario = usuarioRepository.findById(documentoUsuario).orElseThrow(() -> new RuntimeException("Usuario not found with documento: " + documentoUsuario));
        List<Receta> recetas = recetaRepository.findByUsuario(usuario);
        return recetas.stream().map(this::convertToDTO).collect(Collectors.toList());
   }

    @Override
    public List<ProductoDTO> findProductosByRecetaId(Short recetaId) {
        // 1. Buscar la receta por su ID
        return recetaRepository.findById(recetaId)
            .map(receta -> {
                // 2. Si la receta existe, obtener la lista de RecetaProducto
                List<RecetaProducto> recetaProductos = receta.getRecetaProducto();
                // 3. Mapear cada RecetaProducto a su ProductoDTO
                return recetaProductos.stream()
                    .map(recetaProducto -> new ProductoDTO(
                        recetaProducto.getProducto().getId(),
                        recetaProducto.getProducto().getNombre(),
                        recetaProducto.getProducto().getPrecio()
                    ))
                    .collect(Collectors.toList());
            })
            .orElse(null); // 4. Si la receta no se encuentra, retornar null
    }

    private RecetaDTO convertToDTO(Receta receta) {
        RecetaDTO recetaDto = new RecetaDTO(receta);
        return recetaDto;
    }

    private Receta convertToEntity(RecetaDTO recetaDto) {
        Receta receta = new Receta();
        receta.setId(recetaDto.getId());
        receta.setNombre(recetaDto.getNombre());
        receta.setDescripcion(recetaDto.getDescripcion());
        receta.setFoto(recetaDto.getFoto());

        Usuario usuario = usuarioRepository.findById(recetaDto.getDocumentoUsuario())
            .orElseThrow(() -> new RuntimeException("Usuario not found with documento: " + recetaDto.getDocumentoUsuario()));
        receta.setUsuario(usuario);

        return receta;
    }
}