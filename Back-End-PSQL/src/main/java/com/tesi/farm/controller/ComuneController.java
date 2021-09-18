package com.tesi.farm.controller;


import com.tesi.farm.exception.EntityNotFoundException;
import com.tesi.farm.models.comune.Comune;
import com.tesi.farm.models.comune.ComuneRepository;
import com.tesi.farm.models.comune.Provincia;
import com.tesi.farm.models.comune.ProvinciaRowMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.web.bind.annotation.*;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("comune")
@CrossOrigin
public class ComuneController {

    @Autowired
    private ComuneRepository comuneRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    //only read
    @GetMapping("/read/{id}")
    public Comune readOne(@PathVariable Integer id){

        return comuneRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Comune", id));
    }

    @GetMapping("/read/provincia")
    public List<Provincia> readProvincia(){
        String sql = "select distinct provincia, sigla_automobilistica from comune order by provincia;";
        return jdbcTemplate.query(sql, new ProvinciaRowMapper());
    }

    @GetMapping("/read/all/fromProvincia/{provincia}")
    public List<Comune> readFromProvincia(@PathVariable String provincia){
        return comuneRepository.findAllByProvincia(provincia);
    }



    @GetMapping("/read/all")
    public List<Comune> readAll(){
        return comuneRepository.findAll();
    }

}
