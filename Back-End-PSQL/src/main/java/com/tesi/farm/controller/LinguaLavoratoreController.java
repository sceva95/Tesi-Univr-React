package com.tesi.farm.controller;

import com.tesi.farm.exception.EntityNotFoundException;
import com.tesi.farm.exception.EntityNotValidateException;
import com.tesi.farm.models.linguaLavoratore.LinguaLavoratore;
import com.tesi.farm.models.linguaLavoratore.LinguaLavoratoreId;
import com.tesi.farm.models.linguaLavoratore.LinguaLavoratoreRepository;
import com.tesi.farm.models.linguaRichiesta.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.web.bind.annotation.*;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("lingualavoratore")
@CrossOrigin
public class LinguaLavoratoreController {

    @Autowired
    private LinguaLavoratoreRepository linguaLavoratoreRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    //CRUD
    //create
    @PostMapping("/create")
    public LinguaLavoratore create(@RequestBody LinguaLavoratore nuovo){
        if(jdbcTemplate.update("INSERT INTO lingualavoratore(linguaid, lavoratoreid, livellolinguisticorichiesto) VALUES (?,?,?)",
                nuovo.getId().getLinguaid(),
                nuovo.getId().getLavoratoreid(),
                nuovo.getLivelloLinguisticoRichiesto()) == 1)
            return nuovo;
        throw new EntityNotValidateException("Lingua lavoratore");
    }

    //read
    @GetMapping("/read/{linguaid}/{lavoratoreid}")
    public LinguaLavoratore readOne(@PathVariable int linguaid, @PathVariable int lavoratoreid){
        return linguaLavoratoreRepository.findById(new LinguaLavoratoreId(linguaid, lavoratoreid))
                .orElseThrow(() -> new EntityNotFoundException("Lingua lavoratore", 0));
    }

    @GetMapping("read/all")
    public List<LinguaLavoratore> readAll(){
        return linguaLavoratoreRepository.findAll();
    }

    @GetMapping("/read/all/lingue/{lavoratoreid}")
    public List<LinguaRichiestaCompleta> readAllLavoratore(@PathVariable int lavoratoreid){
        String sql="SELECT l.id, l.descrizione, ll.livellolinguisticorichiesto from lingua l join lingualavoratore ll on l.id=ll.linguaid where ll.lavoratoreid=?;";
        return jdbcTemplate.query(sql, new Object[]{lavoratoreid}, new LinguaRichiestaCompletaRowMapper());


    }

    @GetMapping("/read/all/{lavoratoreid}")
    public List<LinguaLavoratore> readAllByLavoratoreID(@PathVariable int lavoratoreid){
        return linguaLavoratoreRepository.findAllById_Lavoratoreid(lavoratoreid);
    }

    //update
    /*@PutMapping("/update/{id}")
    public LinguaLavoratore update(@RequestBody LinguaLavoratore nuovo, @PathVariable LinguaLavoratoreId id){
        return linguaLavoratoreRepository.findById(id)
                .map(richiestaCompetenza -> {
                    richiestaCompetenza.setLivelloLinguisticoRichiesto(nuovo.getLivelloLinguisticoRichiesto());


                    return linguaLavoratoreRepository.save(richiestaCompetenza);
                })
                .orElseGet(() -> {
                    nuovo.setId(id);
                    return linguaLavoratoreRepository.save(nuovo);
                });
    }*/

    //delete
    @DeleteMapping("/delete/{linguaid}/{lavoratoreid}")
    public void delete(@PathVariable int linguaid, @PathVariable int lavoratoreid){
        linguaLavoratoreRepository.deleteById(new LinguaLavoratoreId(linguaid, lavoratoreid));
    }

    @DeleteMapping("/delete/all")
    public void deleteAll(){
        linguaLavoratoreRepository.deleteAll();
    }
}
