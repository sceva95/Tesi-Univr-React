package com.tesi.farm.controller;

import com.tesi.farm.exception.EntityNotFoundException;
import com.tesi.farm.exception.EntityNotValidateException;
import com.tesi.farm.models.statoLavoratore.StatoLavoratore;
import com.tesi.farm.models.statoLavoratore.StatoLavoratoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("statolavoratore")
@CrossOrigin
public class StatoLavoratoreController {

    @Autowired
    private StatoLavoratoreRepository statoLavoratoreRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    //CRUD


    //read
    @GetMapping("/read/{id}")
    public StatoLavoratore readOne(@PathVariable Integer id){
        return statoLavoratoreRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Stato lavoratore", id));
    }

    @GetMapping("/read/all")
    public List<StatoLavoratore> readAll(){
        return statoLavoratoreRepository.findAll();
    }

    @PostMapping("/create")
    public StatoLavoratore create(@RequestBody StatoLavoratore statoLavoratore){
        if(jdbcTemplate.update("INSERT INTO statolavoratore(descrizione) VALUES (?)", statoLavoratore.getDescrizione()) == 1)
            return statoLavoratore;
        else
            throw new EntityNotValidateException("competenza");
    }



    /*
    //create
    @PostMapping("/create")
    public StatoLavoratore create(@RequestBody StatoLavoratore nuovo){
        return statoLavoratoreRepository.save(nuovo);

    }

    //update
    @PutMapping("/update/{id}")
    public StatoLavoratore update(@RequestBody StatoLavoratore nuovo, @PathVariable Integer id) {

        return statoLavoratoreRepository.findById(id)
                .map(competenza -> {
                    competenza.setDescrizione(nuovo.getDescrizione());

                    return statoLavoratoreRepository.save(competenza);
                })
                .orElseGet(() -> {
                    nuovo.setId(id);
                    return statoLavoratoreRepository.save(nuovo);
                });
    }


    //delete
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Integer id){
        statoLavoratoreRepository.deleteById(id);
    }

    //delete ALL
    @DeleteMapping("/delete/all")
    public void deleteAll(){
        statoLavoratoreRepository.deleteAll();
    }
    */

}
