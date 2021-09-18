package com.tesi.farm.controller;

import com.tesi.farm.exception.EntityNotFoundException;
import com.tesi.farm.exception.EntityNotValidateException;
import com.tesi.farm.models.tipoPatente.TipoPatente;
import com.tesi.farm.models.tipoPatente.TipoPatenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("tipopatente")
@CrossOrigin
public class TipoPatenteController {
    @Autowired
    private TipoPatenteRepository tipoPatenteRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    //only read
    @GetMapping("/read/{id}")
    public TipoPatente readOne(@PathVariable String id){
        return tipoPatenteRepository.findById(id.toUpperCase())
                .orElseThrow(() -> new EntityNotFoundException("Tipo patente", id.toUpperCase()));

    }

    @GetMapping("/read/all")
    public List<TipoPatente> readAll(){
        return tipoPatenteRepository.findAll();
    }

    @PostMapping("/create")
    public TipoPatente create(@RequestBody TipoPatente tipoPatente){
        if(jdbcTemplate.update("insert into tipopatente (siglapatente) values (?)", tipoPatente.getSiglaPatente()) == 1)
            return tipoPatente;
        else
            throw new EntityNotValidateException("competenza");
    }
}
