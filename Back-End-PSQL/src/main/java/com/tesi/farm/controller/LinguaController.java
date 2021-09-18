package com.tesi.farm.controller;

import com.tesi.farm.exception.EntityNotFoundException;
import com.tesi.farm.exception.EntityNotValidateException;
import com.tesi.farm.models.competenza.Competenza;
import com.tesi.farm.models.lingua.Lingua;
import com.tesi.farm.models.lingua.LinguaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("lingua")
@CrossOrigin
public class LinguaController {

    @Autowired
    private LinguaRepository linguaRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    //CRUD
    //create
    @PostMapping("/create")
    public Lingua create(@RequestBody Lingua nuovo){
        if(jdbcTemplate.update("insert into lingua (id, descrizione) values ((select max(id) from lingua)+1, ?)", nuovo.getDescrizione()) == 1)
            return nuovo;
        else
            throw new EntityNotValidateException(("lingua"));

    }

    //read
    @GetMapping("/read/{id}")
    public Lingua readOne(@PathVariable Integer id){
        return linguaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Lingua", id));
    }

    @GetMapping("/read/all")
    public List<Lingua> readAll(){
        return linguaRepository.findAll();
    }


    //update
    @PutMapping("/update/{id}")
    public Lingua update(@RequestBody Lingua nuovo, @PathVariable Integer id) {

        return linguaRepository.findById(id)
                .map(competenza -> {
                    competenza.setDescrizione(nuovo.getDescrizione());

                    return linguaRepository.save(competenza);
                })
                .orElseGet(() -> {
                    nuovo.setId(id);
                    return linguaRepository.save(nuovo);
                });
    }


    //delete
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Integer id){
        linguaRepository.deleteById(id);
    }

    //delete ALL
    @DeleteMapping("/delete/all")
    public void deleteAll(){
        linguaRepository.deleteAll();
    }
}
