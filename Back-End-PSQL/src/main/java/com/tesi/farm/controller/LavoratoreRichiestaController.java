package com.tesi.farm.controller;

import com.tesi.farm.exception.EntityNotFoundException;
import com.tesi.farm.exception.EntityNotValidateException;
import com.tesi.farm.models.lavoratoreRichiesta.LavoratoreRIchiestaReset;
import com.tesi.farm.models.lavoratoreRichiesta.LavoratoreRichiesta;
import com.tesi.farm.models.lavoratoreRichiesta.LavoratoreRichiestaId;
import com.tesi.farm.models.lavoratoreRichiesta.LavoratoreRichiestaRepository;
import net.bytebuddy.asm.Advice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.web.bind.annotation.*;

import java.io.InputStream;
import java.io.Reader;
import java.math.BigDecimal;
import java.net.URL;
import java.sql.*;
import java.time.chrono.JapaneseDate;
import java.util.Calendar;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("lavoratorerichiesta")
@CrossOrigin
public class LavoratoreRichiestaController {

    @Autowired
    private LavoratoreRichiestaRepository lavoratoreRichiestaRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    //CRUD
    //create
    @PostMapping("/create")
    public LavoratoreRichiesta create(@RequestBody LavoratoreRichiesta nuovo){
        if(jdbcTemplate.update("INSERT INTO lavoratorerichiesta(lavoratoreid, richiestaid, statoid, dataaggiornamento) values (?,?,?,?) ",
                nuovo.getId().getLavoratoreid(),
                nuovo.getId().getRichiestaid(),
                nuovo.getId().getStatoid(),
                nuovo.getDataAggiornamento()) == 1)
            return nuovo;
        throw new EntityNotValidateException("Lavoratore richiesta");
    }

    //read
    @GetMapping("/read/{lavoratoreid}/{richiestaid}/{statoid}")
    public LavoratoreRichiesta readOne(@PathVariable int lavoratoreid, @PathVariable int richiestaid, @PathVariable int statoid){
        return lavoratoreRichiestaRepository.findById(new LavoratoreRichiestaId(lavoratoreid, richiestaid, statoid))
                .orElseThrow(() -> new EntityNotFoundException("Lavoratore richiesta", 0));
    }

    @GetMapping("/read/all")
    public List<LavoratoreRichiesta> readAll(){
        return lavoratoreRichiestaRepository.findAll();
    }

    @PostMapping("/update")
    public int update(@RequestBody LavoratoreRichiesta lavoratoreRichiesta){
        String sql= "update lavoratorerichiesta set statoid=?, dataaggiornamento=? where richiestaid=? and lavoratoreid=?;";

        return jdbcTemplate.update(sql, lavoratoreRichiesta.getId().getStatoid(), lavoratoreRichiesta.getDataAggiornamento(), lavoratoreRichiesta.getId().getRichiestaid(), lavoratoreRichiesta.getId().getLavoratoreid());

        // after the update executed we can now get the value of the generated ID

    }

    @PostMapping("find")
    public LavoratoreRichiesta find ( @RequestBody LavoratoreRichiesta lavoratoreRichiesta){
        return lavoratoreRichiestaRepository.findById_LavoratoreidAndAndId_Richiestaid(lavoratoreRichiesta.getId().getLavoratoreid(), lavoratoreRichiesta.getId().getRichiestaid());
        }


    @PostMapping("/fineContratto")
    public int fineContratto(@RequestBody LavoratoreRIchiestaReset lavoratoreRIchiestaReset){
        String sql = "update lavoratorerichiesta set statoid=1, dataaggiornamento=? where richiestaid in (select id from richiesta where datafine < ?) and lavoratoreid in (select id from lavoratore where agenziaid=?);";

        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();

        // the name of the generated column (you can track more than one column)
        String id_column = "statoid";

        // the update method takes an implementation of PreparedStatementCreator which could be a lambda
        return jdbcTemplate.update(con -> {
                    PreparedStatement ps = con.prepareStatement(sql, new String[]{});
                    ps.setDate(1, lavoratoreRIchiestaReset.getDatafine());
                    ps.setDate(2, lavoratoreRIchiestaReset.getDataaggiornamento());
                    ps.setInt(3, lavoratoreRIchiestaReset.getAgenziaid());

                    return ps;
                }
                );

        // after the update executed we can now get the value of the generated ID

    }

    //update
    /*@PutMapping("/update/{id}")
    public LavoratoreRichiesta update(@RequestBody LavoratoreRichiesta nuovo, @PathVariable LavoratoreRichiestaId id){
        return lavoratoreRichiestaRepository.findById(id)
                .map(richiestaCompetenza -> {
                    richiestaCompetenza.setDataAggiornamento(nuovo.getDataAggiornamento());


                    return lavoratoreRichiestaRepository.save(richiestaCompetenza);
                })
                .orElseGet(() -> {
                    nuovo.setId(id);
                    return lavoratoreRichiestaRepository.save(nuovo);
                });
    }*/

    //delete
    @DeleteMapping("/delete/{lavoratoreid}/{richiestaid}/{statoid}")
    public void delete(@PathVariable int lavoratoreid, @PathVariable int richiestaid, @PathVariable int statoid){
        lavoratoreRichiestaRepository.deleteById(new LavoratoreRichiestaId(lavoratoreid, richiestaid, statoid));
    }

    @DeleteMapping("/delete/all")
    public void deleteAll(){
        lavoratoreRichiestaRepository.deleteAll();
    }
}
