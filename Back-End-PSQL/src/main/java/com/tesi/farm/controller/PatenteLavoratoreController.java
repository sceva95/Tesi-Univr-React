package com.tesi.farm.controller;

import com.tesi.farm.exception.EntityNotFoundException;
import com.tesi.farm.exception.EntityNotValidateException;
import com.tesi.farm.models.linguaLavoratore.LinguaLavoratore;
import com.tesi.farm.models.linguaLavoratore.LinguaLavoratoreId;
import com.tesi.farm.models.linguaLavoratore.LinguaLavoratoreRepository;
import com.tesi.farm.models.patenteLavoratore.PatenteLavoratore;
import com.tesi.farm.models.patenteLavoratore.PatenteLavoratoreId;
import com.tesi.farm.models.patenteLavoratore.PatenteLavoratoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.web.bind.annotation.*;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("patentelavoratore")
@CrossOrigin
public class PatenteLavoratoreController {

    @Autowired
    private PatenteLavoratoreRepository patenteLavoratoreRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    //CRUD
    //create
    @PostMapping("/create")
    public PatenteLavoratore create(@RequestBody PatenteLavoratore nuovo){
        if(jdbcTemplate.update("INSERT INTO patentelavoratore(patente, lavoratoreid) VALUES (?,?)",
                nuovo.getId().getPatente(),
                nuovo.getId().getLavoratoreId()) == 1)
            return nuovo;
        throw new EntityNotValidateException("Patente lavoratore");
    }

    //read
    @GetMapping("/read/{patente}/{lavoratoreid")
    public PatenteLavoratore readOne(@PathVariable String patente, @PathVariable int lavoratoreid){
        return patenteLavoratoreRepository.findById(new PatenteLavoratoreId(patente, lavoratoreid))
                .orElseThrow(() -> new EntityNotFoundException("Lingua lavoratore", 0));
    }

    @GetMapping("read/all")
    public List<PatenteLavoratore> readAll(){
        return patenteLavoratoreRepository.findAll();
    }

    @GetMapping("/read/all/patenti/{lavoratoreid}")
    public List<String> readAllLavoratore(@PathVariable int lavoratoreid){
        String sql="select patente from patentelavoratore where lavoratoreid=?";
        return jdbcTemplate.query(sql, new Object[]{lavoratoreid}, new RowMapper<String>() {
            @Override
            public String mapRow(ResultSet resultSet, int i) throws SQLException {
                return resultSet.getString("patente");
            }
        });

    }

    @GetMapping("/read/all/{lavoratoreid}")
    public List<PatenteLavoratore> readAllByLavoratoreID(@PathVariable int lavoratoreid){
        return patenteLavoratoreRepository.findAllById_LavoratoreId(lavoratoreid);
    }

    //update
    /*@PutMapping("/update/{id}")
    public PatenteLavoratore update(@RequestBody PatenteLavoratore nuovo, @PathVariable PatenteLavoratoreId id){
        return patenteLavoratoreRepository.findById(id)
                .map(richiestaCompetenza -> {


                    return patenteLavoratoreRepository.save(richiestaCompetenza);
                })
                .orElseGet(() -> {
                    nuovo.setPatenteLavoratoreId(id);
                    return patenteLavoratoreRepository.save(nuovo);
                });
    }*/

    //delete
    @DeleteMapping("/delete/{patente}/{lavoratoreid")
    public void delete(@PathVariable String patente, @PathVariable int lavoratoreid){
        patenteLavoratoreRepository.deleteById(new PatenteLavoratoreId(patente, lavoratoreid));
    }

    @DeleteMapping("/delete/all")
    public void deleteAll(){
        patenteLavoratoreRepository.deleteAll();
    }
}
