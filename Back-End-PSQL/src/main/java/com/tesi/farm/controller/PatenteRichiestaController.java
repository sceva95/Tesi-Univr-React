package com.tesi.farm.controller;

import com.tesi.farm.exception.EntityNotFoundException;
import com.tesi.farm.exception.EntityNotValidateException;
import com.tesi.farm.models.linguaLavoratore.LinguaLavoratore;
import com.tesi.farm.models.linguaLavoratore.LinguaLavoratoreId;
import com.tesi.farm.models.linguaLavoratore.LinguaLavoratoreRepository;
import com.tesi.farm.models.patenteRichiesta.PatenteRichiesta;
import com.tesi.farm.models.patenteRichiesta.PatenteRichiestaId;
import com.tesi.farm.models.patenteRichiesta.PatenteRichiestaRepository;
import net.bytebuddy.asm.Advice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("patenterichiesta")
@CrossOrigin
public class PatenteRichiestaController {

    @Autowired
    private PatenteRichiestaRepository patenteRichiestaRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    //CRUD
    //create
    @PostMapping("/create")
    public PatenteRichiesta create(@RequestBody PatenteRichiesta nuovo){
        if(jdbcTemplate.update("INSERT INTO patenterichiesta(patente, richiestaid) VALUES (?,?)",
                nuovo.getId().getPatente(),
                nuovo.getId().getRichiestaId()) == 1)
            return nuovo;
        throw new EntityNotValidateException("Patente richiesta");
    }

    @PostMapping("/create-update")
    public PatenteRichiesta createUpdate(@RequestBody PatenteRichiesta patenteRichiesta){
        return patenteRichiestaRepository.save(patenteRichiesta);
    }

    //read
    @GetMapping("/read/{patente}/{richiestaid}")
    public PatenteRichiesta readOne(@PathVariable String patente, @PathVariable int richiestaid){
        return patenteRichiestaRepository.findById(new PatenteRichiestaId(patente, richiestaid))
                .orElseThrow(() -> new EntityNotFoundException("Patente richiesta", 0));
    }

    @GetMapping("/read/all/{richiestaid}")
    public List<PatenteRichiesta> readAllFromRichiestaID(@PathVariable int richiestaid){
        return patenteRichiestaRepository.findAllById_RichiestaId(richiestaid);
    }

    @GetMapping("read/all")
    public List<PatenteRichiesta> readAll(){
        return patenteRichiestaRepository.findAll();
    }

    //update
    /*@PutMapping("/update/{id}")
    public PatenteRichiesta update(@RequestBody PatenteRichiesta nuovo, @PathVariable PatenteRichiestaId id){
        return patenteRichiestaRepository.findById(id)
                .map(richiestaCompetenza -> {



                    return patenteRichiestaRepository.save(richiestaCompetenza);
                })
                .orElseGet(() -> {
                    nuovo.setId(id);
                    return patenteRichiestaRepository.save(nuovo);
                });
    }*/

    //delete
    @DeleteMapping("/delete/{patente}/{richiestaid}")
    public void delete(@PathVariable String patente, @PathVariable int richiestaid){
        patenteRichiestaRepository.deleteById(new PatenteRichiestaId(patente, richiestaid));
    }

    @GetMapping("/delete/{richiestaid}")
    public int deleteFromRichiestaid(@PathVariable int richiestaid){
        String sql = "delete from patenterichiesta where richiestaid=" + richiestaid +" ;";
        return jdbcTemplate.update(sql);
    }

    @DeleteMapping("/delete/all")
    public void deleteAll(){
        patenteRichiestaRepository.deleteAll();
    }
}
