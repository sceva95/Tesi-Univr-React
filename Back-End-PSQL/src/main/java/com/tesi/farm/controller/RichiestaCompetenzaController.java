package com.tesi.farm.controller;

import com.tesi.farm.exception.EntityNotFoundException;
import com.tesi.farm.exception.EntityNotValidateException;
import com.tesi.farm.models.linguaRichiesta.LinguaRichiestaCompleta;
import com.tesi.farm.models.linguaRichiesta.LinguaRichiestaCompletaRowMapper;
import com.tesi.farm.models.richiestaCompetenza.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("richiestacompetenza")
@CrossOrigin
public class RichiestaCompetenzaController {

    @Autowired
    private RichiestaCompetenzaRepository richiestaCompetenzaRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    //CRUD

    //create
    @PostMapping("/create")
    public RichiestaCompetenza create(@RequestBody RichiestaCompetenza richiestaCompetenza){
        if(jdbcTemplate.update("INSERT INTO richiestacompetenza(competenzaid, richiestaid, priorita) values (?,?,?)",
                richiestaCompetenza.getId().getCompetenzaid(),
                richiestaCompetenza.getId().getRichiestaid(),
                richiestaCompetenza.getPriorita()) == 1)
            return richiestaCompetenza;
        throw new EntityNotValidateException("Richiesta competenza");
    }

    @PostMapping("/create-update")
    public RichiestaCompetenza createUpdate(@RequestBody RichiestaCompetenza richiestaCompetenza){

       return richiestaCompetenzaRepository.save(richiestaCompetenza);
    }

    //read
    @GetMapping("/read/{competenzaid}/{richiestaid}")
    public RichiestaCompetenza readOne(@PathVariable int competenzaid, @PathVariable int richiestaid){
        return richiestaCompetenzaRepository.findById(new RichiestaCompetenzaId(competenzaid, richiestaid))
                .orElseThrow(() -> new EntityNotFoundException("Richiesta competenza", 0));
    }

    @GetMapping("read/all")
    public List<RichiestaCompetenza> readAll(){
        return richiestaCompetenzaRepository.findAll();
    }

    @GetMapping("read/completa/{richiestaid}")
    public List<RichiestaCompetenzaCompleta> readAllCompleta(@PathVariable int richiestaid){
        String sql = "select c.id, c.descrizione, rc.priorita from competenza c join richiestacompetenza rc on c.id=rc.competenzaid where rc.richiestaid=" + richiestaid + " order by c.descrizione;";
        return jdbcTemplate.query(sql, new RichiestaCompetenzaCompletaRowMapper());
    }

    //update
    /*@PutMapping("/update/{id}")
    public RichiestaCompetenza update(@RequestBody RichiestaCompetenza nuovo, @PathVariable RichiestaCompetenzaId id){
        return richiestaCompetenzaRepository.findById(id)
                .map(richiestaCompetenza -> {
                    richiestaCompetenza.setPriorita(nuovo.getPriorita());


                    return richiestaCompetenzaRepository.save(richiestaCompetenza);
                })
                .orElseGet(() -> {
                    nuovo.setId(id);
                    return richiestaCompetenzaRepository.save(nuovo);
                });
    }*/

    //delete
    @DeleteMapping("/delete/{competenzaid}/{richiestaid}")
    public void delete(@PathVariable int competenzaid, @PathVariable int richiestaid){
        richiestaCompetenzaRepository.deleteById(new RichiestaCompetenzaId(competenzaid, richiestaid));
    }

    @GetMapping("/delete/{richiestaid}")
    public int deleteFromRichiestaid(@PathVariable int richiestaid){
        String sql = "delete from richiestacompetenza where richiestaid=" + richiestaid +" ;";
        return jdbcTemplate.update(sql);
    }

    @DeleteMapping("/delete/all")
    public void deleteAll(){
        richiestaCompetenzaRepository.deleteAll();
    }
}
