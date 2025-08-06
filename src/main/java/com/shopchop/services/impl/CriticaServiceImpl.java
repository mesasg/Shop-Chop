package com.shopchop.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shopchop.dto.CriticaDTO;
import com.shopchop.entities.Critica;
import com.shopchop.entities.Receta;
import com.shopchop.entities.Usuario;
import com.shopchop.repositories.CriticaRepository;
import com.shopchop.repositories.RecetaRepository;
import com.shopchop.repositories.UsuarioRepository;
import com.shopchop.services.CriticaService;

@Service
public class CriticaServiceImpl implements CriticaService {

    @Autowired
    private CriticaRepository criticaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private RecetaRepository recetaRepository;

    @Override
    public List<CriticaDTO> findAll() {
        List<Critica> criticas = (List<Critica>) criticaRepository.findAll();
        return criticas.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Override
    public CriticaDTO save(CriticaDTO criticaDTO) {
        Usuario usuario = usuarioRepository.findById(criticaDTO.getDocumentoUsuario()).orElseThrow();
        Receta receta = recetaRepository.findById(criticaDTO.getIdReceta()).orElseThrow();
        Critica critica = new Critica(criticaDTO.getId(), criticaDTO.getComentario(), usuario, receta);
        return convertToDTO(criticaRepository.save(critica));
    }

    @Override
    public CriticaDTO update(Short id, CriticaDTO criticaDTO) {
        Critica critica = criticaRepository.findById(id).orElseThrow();
        critica.setComentario(criticaDTO.getComentario());
        return convertToDTO(criticaRepository.save(critica));
    }

    @Override
    public void delete(Short id) {
        criticaRepository.deleteById(id);
    }

    @Override
    public List<CriticaDTO> findByUsuario(String documentoUsuario) {
        List<Critica> criticas = criticaRepository.findByUsuario_Documento(documentoUsuario);
        return criticas.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Override
    public List<CriticaDTO> findByReceta(Short idReceta) {
        List<Critica> criticas = criticaRepository.findByReceta_Id(idReceta);
        return criticas.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    private CriticaDTO convertToDTO(Critica critica) {
        return new CriticaDTO(
                critica.getId(),
                critica.getComentario(),
                critica.getUsuario().getDocumento(),
                critica.getReceta().getId()
        );
    }
}