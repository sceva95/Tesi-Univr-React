package com.tesi.farm.controller;

import com.tesi.farm.exception.EntityNotFoundException;
import com.tesi.farm.models.stato.Stato;
import com.tesi.farm.models.stato.StatoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("stato")
@CrossOrigin
public class StatoController {

    @Autowired
    private StatoRepository statoRepository;

    //only read
    @GetMapping("/read/{id}")
    public Stato readOne(@PathVariable Integer id){
        return statoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Stato", id));
    }

    @GetMapping("/read/all")
    public List<Stato> readAll(){
        return statoRepository.findAll();
    }
}
