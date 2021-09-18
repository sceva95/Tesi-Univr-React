package com.tesi.farm.controller;

import com.tesi.farm.exception.EntityNotValidateException;
import com.tesi.farm.exception.EntityNotFoundException;

import com.tesi.farm.models.LoginForm;
import com.tesi.farm.models.agenzia.Agenzia;
import com.tesi.farm.models.agenzia.AgenziaRepository;
import com.tesi.farm.models.agenzia.AgenziaRowMapper;
import com.tesi.farm.models.azienda.Azienda;
import com.tesi.farm.models.azienda.AziendaRowMapper;
import com.tesi.farm.models.comune.ComuneRepository;
import com.tesi.farm.models.lavoratoreRichiesta.LavoratoreRichiestaRepository;
import com.tesi.farm.models.richiesta.RichiestaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("agenzia")
@CrossOrigin
public class AgenziaController {

    @Autowired
    private AgenziaRepository agenziaRepository;

    @Autowired
    private ComuneRepository comuneRepository;

    @Autowired
    private RichiestaRepository richiestaRepository;

    @Autowired
    private LavoratoreRichiestaRepository lavoratoreRichiestaRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;


    private boolean validateCreate(Agenzia agenzia){
        if(agenzia.getRagioneSociale() == null || agenzia.getRagioneSociale().isEmpty()) {
            return false;
        }else if(agenzia.getIndirizzo() == null || agenzia.getIndirizzo().isEmpty())
            return false;
        else if(agenzia.getCap() == null || agenzia.getCap().isEmpty())
            return false;
        else if (agenzia.getUsername() == null || agenzia.getUsername().isEmpty() || agenziaRepository.findByUsername(agenzia.getUsername()) != null)
                return false;
        else if (agenzia.getPassword() == null || agenzia.getPassword().isEmpty())
            return false;
        else if (comuneRepository.findById(agenzia.getComuneId()).get().equals(null))
            return false;
        else
            return true;
    }

    private boolean validateUpdate(Agenzia agenzia){
        try{
            if(agenzia.getRagioneSociale() == null || agenzia.getRagioneSociale().isEmpty()) {
                return false;
            }else if(agenzia.getIndirizzo() == null || agenzia.getIndirizzo().isEmpty())
                return false;
            else if(agenzia.getCap() == null || agenzia.getCap().isEmpty())
                return false;
            else if (agenzia.getUsername() == null || agenzia.getUsername().isEmpty() )
                return false;
            else if (agenzia.getPassword() == null || agenzia.getPassword().isEmpty() )
                return false;
            else if (comuneRepository.findById(agenzia.getComuneId()).get().equals(null))
                return false;
            else
                return true;
        }catch (Exception e){
            return false;
        }
    }



    //CRUD

    //LOGIN
    @PostMapping("/login")
    public Agenzia login(@RequestBody LoginForm login){
        String sql = "select * from agenzia where username = ? and password = crypt('" + login.getPassword() +"', password)";
        Agenzia agenzia = new Agenzia();
        try {
            agenzia = jdbcTemplate.queryForObject(sql, new Object[]{login.getUsername()},
                    new AgenziaRowMapper());
        }catch (Exception e){
            return null;
        }
        if(agenzia.getId() != 0)
            return agenzia;
        else{
            return null;
        }
    }


    //create
    @PostMapping("/create")
    public Agenzia create(@RequestBody Agenzia nuova){
        if(validateCreate(nuova)) {
            if(jdbcTemplate.update("INSERT INTO agenzia(ragionesociale, indirizzo, comuneid, cap, telefono, email, urlsito, username, password) " +
                            "VALUES(?,?,?,?,?,?,?,?,crypt(?, gen_salt('bf'))) ",
                    nuova.getRagioneSociale(),
                    nuova.getIndirizzo(),
                    nuova.getComuneId(),
                    nuova.getCap(),
                    nuova.getTelefono(),
                    nuova.getEmail(),
                    nuova.getUrlsito(),
                    nuova.getUsername(),
                    nuova.getPassword(),
                    nuova.getCreatedat(),
                    nuova.getUpdatedat()
            ) == 1)
                return nuova;
            else
                throw new EntityNotValidateException("Agenzia");

        }
        else
            throw new EntityNotValidateException("Agenzia");
    }

    //read
    @GetMapping("/read/{id}")
    public Agenzia readOne(@PathVariable Integer id){
        return agenziaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Agenzia", id));
    }

    @GetMapping("/read/all")
    public List<Agenzia> readAll(){
        return agenziaRepository.findAll();
    }




    //update
    @PutMapping("/update/agenzia/{id}")
    public Agenzia update(@RequestBody Agenzia nuovo, @PathVariable Integer id) {
        if (validateUpdate(nuovo))
            return agenziaRepository.findById(id)
                    .map(agenzia -> {


                        agenzia.setTelefono(nuovo.getTelefono());
                        agenzia.setEmail(nuovo.getEmail());
                        agenzia.setUrlsito(nuovo.getUrlsito());

                        agenzia.setUpdatedat(nuovo.getUpdatedat());


                        return agenziaRepository.save(agenzia);
                    }).get();
                    /*.orElseGet(() -> {
                        nuovo.setId(id);
                        return agenziaRepository.save(nuovo);
                    });*/
        else
            throw new EntityNotValidateException("Agenzia");
    }

    @PostMapping("/update/{id}")
    public int updateAzienda(@RequestBody Agenzia agenzia, @PathVariable int id){
        String sql= "update agenzia set email=?, telefono=?, urlsito=?, updatedat=? where id=?;";
        return jdbcTemplate.update(con->{
            PreparedStatement ps= con.prepareStatement(sql, new String[]{});
            ps.setString(1, agenzia.getEmail());
            ps.setString(2, agenzia.getTelefono());
            ps.setString(3, agenzia.getUrlsito());
            ps.setDate(4, agenzia.getUpdatedat());
            ps.setInt(5, id);
            return ps;
        });
    }

    @PutMapping("/update/password/{id}")
    public int updatePassword(@RequestBody Agenzia agenzia, @PathVariable Integer id){
        if(validateUpdate(agenzia)){
            return jdbcTemplate.update("UPDATE agenzia SET password= crypt(?, gen_salt('bf')) WHERE id = ?", agenzia.getPassword(), id);
        }else
            return 0;
    }

    //delete
    @DeleteMapping("delete/{id}")
    public void delete(@PathVariable Integer id){
        agenziaRepository.deleteById(id);
    }
}
