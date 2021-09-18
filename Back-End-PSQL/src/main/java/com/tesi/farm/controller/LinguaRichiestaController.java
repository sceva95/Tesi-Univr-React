package com.tesi.farm.controller;

import com.tesi.farm.exception.EntityNotFoundException;
import com.tesi.farm.exception.EntityNotValidateException;
import com.tesi.farm.models.linguaRichiesta.*;
import com.tesi.farm.models.richiestaCompetenza.RichiestaCompetenza;
import com.tesi.farm.models.richiestaCompetenza.RichiestaCompetenzaId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("linguarichiesta")
@CrossOrigin
public class LinguaRichiestaController {

    @Autowired
    private LinguaRichiestaRepository linguaRichiestaRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    //CRUD
    //create
    @PostMapping("/create")
    public LinguaRichiesta create(@RequestBody LinguaRichiesta linguaRichiesta){
        if(jdbcTemplate.update("INSERT INTO linguarichiesta(linguaid, richiestaid, livellolinguisticorichiesto) VALUES (?,?,?)",
                linguaRichiesta.getId().getLinguaid(),
                linguaRichiesta.getId().getRichiestaid(),
                linguaRichiesta.getLivelloLinguisticoRichiesto()) == 1)
            return linguaRichiesta;
        throw new EntityNotValidateException("Lingua richiesta");
    }

    @PostMapping("/create-update")
    public LinguaRichiesta createUpdate(@RequestBody LinguaRichiesta linguaRichiesta){
        return linguaRichiestaRepository.save(linguaRichiesta);
    }

    //read
    @GetMapping("/read/{linguaid}/{richiestaid}")
    public LinguaRichiesta readOne(@PathVariable int linguaid, @PathVariable int richiestaid){
        return linguaRichiestaRepository.findById(new LinguaRichiestaId(linguaid, richiestaid))
                .orElseThrow(() -> new EntityNotFoundException("Lingua richiesta", 0));
    }

    @GetMapping("read/all")
    public List<LinguaRichiesta> readAll(){
        return linguaRichiestaRepository.findAll();
    }

    @GetMapping("read/completa/{richiestaid}")
    public List<LinguaRichiestaCompleta> readAllCompleta(@PathVariable int richiestaid){
        String sql = "select l.id, l.descrizione, lr.livellolinguisticorichiesto from lingua l join linguarichiesta lr on l.id=lr.linguaid where lr.richiestaid=" + richiestaid + " order by (l.descrizione, lr.livellolinguisticorichiesto);";
        return jdbcTemplate.query(sql, new LinguaRichiestaCompletaRowMapper());
    }

    //update
    /*@PutMapping("/update/{id}")
    public LinguaRichiesta update(@RequestBody LinguaRichiesta nuovo, @PathVariable LinguaRichiestaId id){
        return linguaRichiestaRepository.findById(id)
                .map(richiestaCompetenza -> {
                    richiestaCompetenza.setLivelloLinguisticoRichiesto(nuovo.getLivelloLinguisticoRichiesto());


                    return linguaRichiestaRepository.save(richiestaCompetenza);
                })
                .orElseGet(() -> {
                    nuovo.setId(id);
                    return linguaRichiestaRepository.save(nuovo);
                });
    }*/

    //delete
    @DeleteMapping("/delete/{linguaid}/{richiestaid}")
    public void delete(@PathVariable int linguaid, @PathVariable int richiestaid){
        linguaRichiestaRepository.deleteById(new LinguaRichiestaId(linguaid, richiestaid));
    }

    @GetMapping("/delete/{richiestaid}")
    public int deleteFromRichiestaid(@PathVariable int richiestaid){
        String sql = "delete from linguarichiesta where richiestaid=" + richiestaid +" ;";
        return jdbcTemplate.update(sql);
    }

    @DeleteMapping("/delete/all")
    public void deleteAll(){
        linguaRichiestaRepository.deleteAll();
    }
}
