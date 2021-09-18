package com.tesi.farm.controller;


import com.tesi.farm.exception.EntityNotFoundException;
import com.tesi.farm.exception.EntityNotValidateException;

import com.tesi.farm.models.tipoContratto.TipoContratto;
import com.tesi.farm.models.tipoContratto.TipoContrattoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("contratto")
@CrossOrigin
public class ContrattoController {


        @Autowired
        private TipoContrattoRepository contrattoRepository;

        @Autowired
        private JdbcTemplate jdbcTemplate;

        //CRUD
        //create
        @PostMapping("/create")
        public TipoContratto create(@RequestBody TipoContratto nuovo){
            if(jdbcTemplate.update("INSERT INTO contratto(descrizione) VALUES (?)", nuovo.getDescrizione()) == 1)
                return nuovo;
            else
                throw new EntityNotValidateException("contratto");

        }

        //read
        @GetMapping("/read/{id}")
        public TipoContratto readOne(@PathVariable Integer id){
            return contrattoRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Contratto", id));
        }

        @GetMapping("/read/all")
        public List<TipoContratto> readAll(){
            return contrattoRepository.findAll();
        }


        //update
        @PutMapping("/update/{id}")
        public TipoContratto update(@RequestBody TipoContratto nuovo, @PathVariable Integer id) {

            return contrattoRepository.findById(id)
                    .map(contratto -> {
                        contratto.setDescrizione(nuovo.getDescrizione());

                        return contrattoRepository.save(contratto);
                    })
                    .orElseGet(() -> {
                        nuovo.setId(id);
                        return contrattoRepository.save(nuovo);
                    });
        }


        //delete
        @DeleteMapping("/delete/{id}")
        public void delete(@PathVariable Integer id){
            contrattoRepository.deleteById(id);
        }

        //delete ALL
        @DeleteMapping("/delete/all")
        public void deleteAll(){
            contrattoRepository.deleteAll();
        }


}
