package com.tesi.farm.controller;

import com.tesi.farm.exception.EntityNotFoundException;
import com.tesi.farm.exception.EntityNotValidateException;
import com.tesi.farm.models.lingua.Lingua;
import com.tesi.farm.models.statoIter.StatoIter;
import com.tesi.farm.models.statoIter.StatoIterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("statoiter")
@CrossOrigin
public class StatoIterController {

    @Autowired
    private StatoIterRepository statoIterRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    //CRUD
    //create
    /*@PostMapping("/create")
    public StatoIter create(@RequestBody StatoIter nuovo){
        return statoIterRepository.save(nuovo);

    }*/

    //read
    @GetMapping("/read/{id}")
    public StatoIter readOne(@PathVariable Integer id){
        return statoIterRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Stato iter", id));
    }

    @GetMapping("/read/all")
    public List<StatoIter> readAll(){
        return statoIterRepository.findAll();
    }

    @PostMapping("/create")
    public StatoIter create(@RequestBody StatoIter statoIter){
        if(jdbcTemplate.update("INSERT INTO statoiter(descrizione) VALUES (?)", statoIter.getDescrizione()) == 1)
            return statoIter;
        else
            throw new EntityNotValidateException("competenza");
    }


    /*update
    @PutMapping("/update/{id}")
    public StatoIter update(@RequestBody StatoIter nuovo, @PathVariable Integer id) {

        return statoIterRepository.findById(id)
                .map(competenza -> {
                    competenza.setDescrizione(nuovo.getDescrizione());

                    return statoIterRepository.save(competenza);
                })
                .orElseGet(() -> {
                    nuovo.setId(id);
                        return statoIterRepository.save(nuovo);
                });
    }


    //delete
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Integer id){
        statoIterRepository.deleteById(id);
    }

    //delete ALL
    @DeleteMapping("/delete/all")
    public void deleteAll(){
        statoIterRepository.deleteAll();
    }*/
}
