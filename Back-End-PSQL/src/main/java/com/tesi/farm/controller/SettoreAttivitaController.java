package com.tesi.farm.controller;

import com.tesi.farm.exception.EntityNotFoundException;

import com.tesi.farm.models.settoreAttivita.SettoreAttivita;
import com.tesi.farm.models.settoreAttivita.SettoreAttivitaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("settoreattivita")
@CrossOrigin
public class SettoreAttivitaController {

    @Autowired
    private SettoreAttivitaRepository settoreAttivitaRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    //CRUD


    //create
    @PostMapping("/create")
    public int create(@RequestBody SettoreAttivita nuovo){
        return jdbcTemplate.update("insert into settoreattivita (id, descrizione) values ((select max(id) from settoreattivita)+1, ?)",  nuovo.getDescrizione());
    }

    //read
    @GetMapping("/read/{id}")
    public SettoreAttivita readOne(@PathVariable Integer id){
        return settoreAttivitaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Settore attivita", id));
    }

    @GetMapping("/read/all")
    public List<SettoreAttivita> readAll(){
        return settoreAttivitaRepository.findAll();
    }


    //update
    @PutMapping("/update/{id}")
    public SettoreAttivita update(@RequestBody SettoreAttivita nuovo, @PathVariable Integer id) {

        return settoreAttivitaRepository.findById(id)
                .map(settoreAttivita -> {
                    settoreAttivita.setDescrizione(nuovo.getDescrizione());

                    return settoreAttivitaRepository.save(settoreAttivita);
                })
                .orElseGet(() -> {
                    nuovo.setId(id);
                    return settoreAttivitaRepository.save(nuovo);
                });
    }


    //delete
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Integer id){
        settoreAttivitaRepository.deleteById(id);
    }

    //delete ALL
    @DeleteMapping("/delete/all")
    public void deleteAll(){
        settoreAttivitaRepository.deleteAll();
    }


}
