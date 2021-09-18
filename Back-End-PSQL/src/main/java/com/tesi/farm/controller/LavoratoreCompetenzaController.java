package com.tesi.farm.controller;

import com.tesi.farm.exception.EntityNotFoundException;
import com.tesi.farm.exception.EntityNotValidateException;
import com.tesi.farm.models.competenza.Competenza;
import com.tesi.farm.models.lavoratoreCompetenza.LavoratoreCompetenza;
import com.tesi.farm.models.lavoratoreCompetenza.LavoratoreCompetenzaId;
import com.tesi.farm.models.lavoratoreCompetenza.LavoratoreCompetenzaRepository;
import com.tesi.farm.models.linguaLavoratore.LinguaLavoratore;
import com.tesi.farm.models.linguaLavoratore.LinguaLavoratoreId;
import com.tesi.farm.models.linguaLavoratore.LinguaLavoratoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.web.bind.annotation.*;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("lavoratorecompetenza")
@CrossOrigin
public class LavoratoreCompetenzaController {

    @Autowired
    private LavoratoreCompetenzaRepository lavoratoreCompetenzaRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    //CRUD
    //create
    @PostMapping("/create")
    public LavoratoreCompetenza create(@RequestBody LavoratoreCompetenza nuovo){
        if(jdbcTemplate.update("INSERT INTO lavoratorecompetenza(competenzaid, lavoratoreid) values(?,?)", nuovo.getLavoratoreCompetenzaId().getCompetenzaid(), nuovo.getLavoratoreCompetenzaId().getLavoratoreid()) == 1)
            return nuovo;
        throw new EntityNotValidateException("LavoratoreCompetenza") ;
    }

    //read
    @GetMapping("/read/{competenzaid}/{lavoratoreid}")
    public LavoratoreCompetenza readOne(@PathVariable int competenzaid, @PathVariable int lavoratoreid){
        return lavoratoreCompetenzaRepository.findById(new LavoratoreCompetenzaId(competenzaid, lavoratoreid))
                .orElseThrow(() -> new EntityNotFoundException("Lavoratore competenza", 0));
    }

    @GetMapping("read/all")
    public List<LavoratoreCompetenza> readAll(){
        return lavoratoreCompetenzaRepository.findAll();
    }

    @GetMapping("/read/all/competenze/{lavoratoreid}")
    public List<String> readAllLavoratore(@PathVariable int lavoratoreid){
        String sql="select c.descrizione from competenza c join lavoratorecompetenza l on c.id=l.competenzaid where l.lavoratoreid=?";
        return jdbcTemplate.query(sql, new Object[]{lavoratoreid}, new RowMapper<String>() {
            @Override
            public String mapRow(ResultSet resultSet, int i) throws SQLException {
                return resultSet.getString("descrizione");
            }
        });

    }

    @GetMapping("/read/all/{lavoratoreid}")
    public List<LavoratoreCompetenza> readAllByLavoratoreID(@PathVariable int lavoratoreid) {
        return lavoratoreCompetenzaRepository.findAllByLavoratoreCompetenzaId_Lavoratoreid(lavoratoreid);
    }

    //update
    /*@PutMapping("/update/{id}")
    public LavoratoreCompetenza update(@RequestBody LavoratoreCompetenza nuovo, @PathVariable LavoratoreCompetenzaId id){
        return lavoratoreCompetenzaRepository.findById(id)
                .map(richiestaCompetenza -> {


                    return lavoratoreCompetenzaRepository.save(richiestaCompetenza);
                })
                .orElseGet(() -> {
                    nuovo.setLavoratoreCompetenzaId(id);
                    return lavoratoreCompetenzaRepository.save(nuovo);
                });
    }*/

    //delete
    @DeleteMapping("/delete/{competenzaid}/{lavoratoreid}")
    public void delete(@PathVariable int competenzaid, @PathVariable int lavoratoreid){
        lavoratoreCompetenzaRepository.deleteById(new LavoratoreCompetenzaId(competenzaid, lavoratoreid));
    }

    @DeleteMapping("/delete/all")
    public void deleteAll(){
        lavoratoreCompetenzaRepository.deleteAll();
    }
}
