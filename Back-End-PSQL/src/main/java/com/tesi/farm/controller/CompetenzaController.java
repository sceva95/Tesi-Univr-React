package com.tesi.farm.controller;

import com.tesi.farm.exception.EntityNotFoundException;
import com.tesi.farm.exception.EntityNotValidateException;
import com.tesi.farm.models.competenza.Competenza;
import com.tesi.farm.models.competenza.CompetenzaRepository;
import com.tesi.farm.models.settoreAttivita.SettoreAttivita;
import com.tesi.farm.models.settoreAttivita.SettoreAttivitaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("competenza")
@CrossOrigin
public class CompetenzaController {


        @Autowired
        private CompetenzaRepository competenzaRepository;

        @Autowired
        private JdbcTemplate jdbcTemplate;

        //CRUD
        //create
        @PostMapping("/create")
        public Competenza create(@RequestBody Competenza nuovo){
            if(jdbcTemplate.update("insert into competenza (id, descrizione) values ((select max(id) from competenza)+1 , ?)", nuovo.getDescrizione()) == 1)
                return nuovo;
            else
                throw new EntityNotValidateException("competenza");

        }

        //read
        @GetMapping("/read/{id}")
        public Competenza readOne(@PathVariable Integer id){
            return competenzaRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Competenza", id));
        }

        @GetMapping("/read/all")
        public List<Competenza> readAll(){
            return competenzaRepository.findAll();
        }


        //update
        @PutMapping("/update/{id}")
        public Competenza update(@RequestBody Competenza nuovo, @PathVariable Integer id) {

            return competenzaRepository.findById(id)
                    .map(competenza -> {
                        competenza.setDescrizione(nuovo.getDescrizione());

                        return competenzaRepository.save(competenza);
                    })
                    .orElseGet(() -> {
                        nuovo.setId(id);
                        return competenzaRepository.save(nuovo);
                    });
        }


        //delete
        @DeleteMapping("/delete/{id}")
        public void delete(@PathVariable Integer id){
            competenzaRepository.deleteById(id);
        }

        //delete ALL
        @DeleteMapping("/delete/all")
        public void deleteAll(){
            competenzaRepository.deleteAll();
        }


}
