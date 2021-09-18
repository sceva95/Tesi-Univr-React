package com.tesi.farm.controller;

import com.tesi.farm.exception.EntityNotFoundException;
import com.tesi.farm.exception.EntityNotValidateException;
import com.tesi.farm.models.agenzia.Agenzia;
import com.tesi.farm.models.comune.ComuneRepository;
import com.tesi.farm.models.lavoratore.*;
import com.tesi.farm.models.lavoratoreRichiesta.LavoratoreProposto;
import com.tesi.farm.models.lavoratoreRichiesta.LavoratorePropostoRowMapper;
import com.tesi.farm.models.stato.StatoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.web.bind.annotation.*;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("lavoratore")
@CrossOrigin
public class LavoratoreController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private LavoratoreRepository lavoratoreRepository;

    @Autowired
    private ComuneRepository comuneRepository;

    @Autowired
    private StatoRepository statoRepository;

    private boolean validate(Lavoratore lavoratore){

        if(statoRepository.findById(lavoratore.getNazionalita()).get().equals(null))
            return false;
        else if (comuneRepository.findById(lavoratore.getComuneid()).get().equals(null))
            return false;
        else
            return true;
    }

    //CRUD
    //create
    @PostMapping("/create")
    public Lavoratore create(@RequestBody Lavoratore nuova){
        if(validate(nuova))
            if(jdbcTemplate.update("INSERT INTO lavoratore(nome, cognome, sesso, dataDiNascita, statusGiuridico, codiceFiscale, indirizzo, comuneid, nazionalità, telefono, email) " +
                            "VALUES(?,?,?,?,?,?,?,?,?,?,?)",
                    nuova.getNome(),
                    nuova.getCognome(),
                    nuova.getSesso(),
                    nuova.getDataDiNascita(),
                    nuova.getStatusGiuridico(),
                    nuova.getCodiceFiscale(),
                    nuova.getIndirizzo(),
                    nuova.getComuneid(),
                    nuova.getCap(),
                    nuova.getNazionalita(),
                    nuova.getTelefono(),
                    nuova.getEmail(),
                    nuova.getCreatedat(),
                    nuova.getUpdatedat(),
                    nuova.getAgenziaid()

            ) == 1)
                return nuova;
        throw new EntityNotValidateException("lavoratore");
    }

    //read
    @GetMapping("/read/{id}")
    public Lavoratore readOne(@PathVariable Integer id){
        return lavoratoreRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Lavoratore", id));
    }

    @GetMapping("/read/lavoratoreproposto/{richiestaid}")
    public List<LavoratoreProposto> readProposto(@PathVariable int richiestaid){
        String sql= "select l.id, l.nome, l.cognome, l.sesso, l.datadinascita, s.nome_stati as nazionalita, l.telefono, l.email, l.statusgiuridico, lr.statoid from lavoratore l join lavoratorerichiesta lr on l.id=lr.lavoratoreid join stato s on l.nazionalità=s.id_stati where lr.richiestaid=" + richiestaid + " ;";
        return jdbcTemplate.query(sql, new LavoratorePropostoRowMapper());
    }

    @GetMapping("/read/all/{agenziaid}")
    public List<LavoratoreCompletoAgenzia> readAllByAgenziaid(@PathVariable int agenziaid){
        String sql= "select l.id, l.nome, l.cognome, l.sesso, l.datadinascita, l.statusgiuridico, l.codicefiscale, l.indirizzo, l.cap, " +
                "l.telefono, l.email, l.createdat, l.updatedat, l.deletedat, lm.stato as statoid, lm.dataaggiornamento, lm.datainizio, lm.datafine, c.denominazione_italiana_e_straniera as comune, c.sigla_automobilistica, s.nome_stati as nazionalita, lm.richiesta as richiesta\n" +
                "from lavoratore l\n" +
                "left join (select lr.lavoratoreid as id, lr.richiestaid as richiesta, lr.statoid as stato, lr.dataaggiornamento as dataaggiornamento, " +
                "r.datafine as datafine, r.datainizio as datainizio from lavoratorerichiesta lr join richiesta r on r.id=lr.richiestaid\n" +
                "\t\t   where lr.dataaggiornamento in (select max(dataaggiornamento) from lavoratorerichiesta a where a.lavoratoreid=lr.lavoratoreid) and r.datafine > CURRENT_DATE\n" +
                ") lm on l.id=lm.id join comune c on l.comuneid=c.codice_comune_formato_numerico join stato s on s.id_stati=l.nazionalità\n" +
                "where l.agenziaid=" + agenziaid +
                " order by l.id;";
        return jdbcTemplate.query(sql, new LavoratoreCompletoAgenziaRowMapper());
    }

    @GetMapping("/read/completo/{id}")
    public List<LavoratoreCompletoAgenzia> read(@PathVariable int id){
        String sql= "select l.id, l.nome, l.cognome, l.sesso, l.datadinascita, l.statusgiuridico, l.codicefiscale, l.indirizzo, l.cap, c.denominazione_italiana_e_straniera as comune, c.sigla_automobilistica, l.telefono, l.email, l.createdat, l.updatedat, l.deletedat, s.nome_stati as nazionalita, lr.statoid, lr.dataaggiornamento, lr.richiestaid as richiesta, r.datainizio, r.datafine  from lavoratore l join comune c on l.comuneid=c.codice_comune_formato_numerico left join lavoratorerichiesta lr on l.id=lr.lavoratoreid left join richiesta r on r.id=lr.richiestaid join stato s on s.id_stati=l.nazionalità where l.id= " + id + " ;";
        return jdbcTemplate.query(sql, new LavoratoreCompletoAgenziaRowMapper());
    }

    @GetMapping("/read/non/occupati/{agenziaid}")
    public List<Lavoratore> readNonOccupati(@PathVariable int agenziaid){
        //elimino i lavoratori con statoid = 2
        String sql= "select * from lavoratore where agenziaid=" + agenziaid + " and id not in (select lr.lavoratoreid from lavoratorerichiesta lr join richiesta r on lr.richiestaid=r.id where lr.statoid=2 and r.datafine > CURRENT_DATE );";
        return jdbcTemplate.query(sql, new LavoratoreRowMapper());
    }

    @GetMapping("/read/all")
    public List<Lavoratore> readAll(){
        return lavoratoreRepository.findAll();
    }

    //update
    @PutMapping("/update/{id}")
    public Lavoratore update(@RequestBody Lavoratore nuovo, @PathVariable Integer id) {
        if (validate(nuovo))
            return lavoratoreRepository.findById(id)
                    .map(lavoratore -> {
                        lavoratore.setNome(nuovo.getNome());
                        lavoratore.setCognome(nuovo.getCognome());
                        lavoratore.setSesso(nuovo.getSesso());
                        lavoratore.setDataDiNascita(nuovo.getDataDiNascita());
                        lavoratore.setStatusGiuridico(nuovo.getStatusGiuridico());
                        lavoratore.setCodiceFiscale(nuovo.getCodiceFiscale());
                        lavoratore.setIndirizzo(nuovo.getIndirizzo());
                        lavoratore.setComuneid(nuovo.getComuneid());
                        lavoratore.setCap(nuovo.getCap());
                        lavoratore.setNazionalita(nuovo.getNazionalita());
                        lavoratore.setTelefono(nuovo.getTelefono());
                        lavoratore.setEmail(nuovo.getEmail());
                        lavoratore.setCreatedat(nuovo.getCreatedat());
                        lavoratore.setUpdatedat(nuovo.getUpdatedat());
                        lavoratore.setAgenziaid(nuovo.getAgenziaid());


                        return lavoratoreRepository.save(lavoratore);
                    })
                    .orElseGet(() -> {
                        nuovo.setId(id);
                        return lavoratoreRepository.save(nuovo);
                    });
        else
            throw new EntityNotValidateException("Lavoratore");
    }

    //delete
    @DeleteMapping("delete/{id}")
    public void delete(@PathVariable Integer id){
        lavoratoreRepository.deleteById(id);
    }
}
