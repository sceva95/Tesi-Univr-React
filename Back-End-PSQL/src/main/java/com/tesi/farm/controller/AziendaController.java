package com.tesi.farm.controller;


import com.tesi.farm.exception.EntityNotFoundException;
import com.tesi.farm.exception.EntityNotValidateException;
import com.tesi.farm.mail.CentroNotifiche;
import com.tesi.farm.models.LoginForm;
import com.tesi.farm.models.agenzia.Agenzia;
import com.tesi.farm.models.agenzia.AgenziaRepository;
import com.tesi.farm.models.azienda.*;
import com.tesi.farm.models.comune.ComuneRepository;
import com.tesi.farm.models.settoreAttivita.SettoreAttivitaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.mail.MailException;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.util.List;

@RestController
@RequestMapping("azienda")
@CrossOrigin
public class AziendaController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private AziendaRepository aziendaRepository;

    @Autowired
    private ComuneRepository comuneRepository;

    @Autowired
    private SettoreAttivitaRepository settoreAttivitaRepository;

    @Autowired
    private CentroNotifiche centroNotifiche;

    @Autowired
    private AgenziaRepository agenziaRepository;

    //validate: controllo i valori null/vuoti e se esistono gli id di comune e settoreattivita
    private boolean validate(Azienda azienda) {
        if (azienda.getRagioneSociale() == null || azienda.getRagioneSociale().isEmpty())
            return false;
        else if (azienda.getIndirizzo() == null || azienda.getIndirizzo().isEmpty()) {
            return false;
        }else if (azienda.getCap() == null || azienda.getCap().isEmpty())
            return false;
        else if (azienda.getUsername() == null || azienda.getUsername().isEmpty() || aziendaRepository.findByUsername(azienda.getUsername()) != null)
            return false;
        else if (azienda.getPassword() == null || azienda.getPassword().isEmpty())
            return false;
        else if (comuneRepository.findById(azienda.getComuneId()).get().equals(null))
            return false;
        else if (settoreAttivitaRepository.findById(azienda.getSettoreAttivitaId()).get().equals(null))
            return false;
        else
            return true;
    }

    //CRUD


    //LOGIN
    @PostMapping("/login")
    public Azienda login(@RequestBody LoginForm login){

        String sql = "select * from azienda where username = ? and password = crypt('" + login.getPassword() +"', password)";
        return jdbcTemplate.queryForObject(sql, new Object[]{ login.getUsername() },
                new AziendaRowMapper());
    }

    //create
    @PostMapping("/create")
    public Azienda create(@RequestBody Azienda nuova) {

            if (jdbcTemplate.update("INSERT INTO azienda(ragionesociale, partitaiva, indirizzo, comuneid, cap, telefono, email, urlsito, settoreattivitaid, approved, createdat, updatedat, deletedat,  username, password, agenziaid) " +
                            "VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,crypt(?, gen_salt('bf')),?) ",
                    nuova.getRagioneSociale(),
                    nuova.getPartitaiva(),
                    nuova.getIndirizzo(),
                    nuova.getComuneId(),
                    nuova.getCap(),
                    nuova.getTelefono(),
                    nuova.getEmail(),
                    nuova.getUrlsito(),
                    nuova.getSettoreAttivitaId(),
                    nuova.getApproved(),
                    nuova.getCreatedat(),
                    nuova.getUpdatedat(),
                    nuova.getDeletedat(),
                    nuova.getUsername(),
                    nuova.getPassword(),
                    nuova.getAgenziaid()
            ) == 1)
                try{
                    Agenzia agenzia = agenziaRepository.findById(nuova.getAgenziaid()).get();
                    centroNotifiche.senMail(agenzia.getEmail(), "Nuova registrazione", "L'azienda: " + nuova.getRagioneSociale() +" è in attesa di approvazione.\n\nFarmApp");
                }catch (MailException e){
                    e.printStackTrace();
                }finally {
                    return nuova;
                }

            else
                throw new EntityNotValidateException("Azienda");


    }



    //read
    @GetMapping("/read/all")
    public List<Azienda> readAll(){
        return aziendaRepository.findAll();
    }

    @GetMapping("/read/{id}")
    public Azienda readOne(@PathVariable Integer id){
        return aziendaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Azienda", id));
    }

    @GetMapping("read/all/{agenziaid}")
    public List<AziendaCompleta> readAllByAgenziaid(@PathVariable int agenziaid){
        String sql = "select a.id, a.ragionesociale, a.partitaiva, a.indirizzo, a.comuneid, a.cap, a.telefono, a.email, a.urlsito, a.settoreattivitaid, a.approved, a.createdat, a.updatedat, a.deletedat, a.username, a.agenziaid, c.denominazione_italiana_e_straniera as comune, c.sigla_automobilistica as provincia, s.descrizione as settoreattivita from azienda a join comune c on a.comuneid=c.codice_comune_formato_numerico join settoreattivita s on a.settoreattivitaid=s.id where a.agenziaid=" + agenziaid + " ;";
        return jdbcTemplate.query(sql, new AziendaCompletaRowMapper());
    }

    @PostMapping("approva")
    public int approva(@RequestBody AziendaCompleta aziendaCompleta){
        String sql= "update azienda set approved=? where id=?;";
        return jdbcTemplate.update(con->{
            PreparedStatement ps= con.prepareStatement(sql, new String[]{});
            ps.setDate(1, aziendaCompleta.getApproved());
            ps.setInt(2, aziendaCompleta.getId());
            return ps;
        });
    }

    @PostMapping("elimina")
    public int elimina(@RequestBody AziendaCompleta aziendaCompleta){
        String sql= "update azienda set deletedat=? where id=?;";
        return jdbcTemplate.update(con->{
            PreparedStatement ps= con.prepareStatement(sql, new String[]{});
            ps.setDate(1, aziendaCompleta.getDeletedat());
            ps.setInt(2, aziendaCompleta.getId());
            return ps;
        });
    }

    @PostMapping("/update/{id}")
    public int updateAzienda(@RequestBody Azienda azienda, @PathVariable int id){
        String sql= "update azienda set email=?, telefono=?, urlsito=?, updatedat=? where id=?;";
        return jdbcTemplate.update(con->{
            PreparedStatement ps= con.prepareStatement(sql, new String[]{});
            ps.setString(1, azienda.getEmail());
            ps.setString(2, azienda.getTelefono());
            ps.setString(3, azienda.getUrlsito());
            ps.setDate(4, azienda.getUpdatedat());
            ps.setInt(5, id);
            return ps;
        });
    }

    //update
    @PutMapping("/update/new/{id}")
    public Azienda update(@RequestBody Azienda nuovo, @PathVariable Integer id) {
        if(validate(nuovo))
            return aziendaRepository.findById(id)
                    .map(azienda -> {
                        azienda.setRagioneSociale(nuovo.getRagioneSociale());
                        azienda.setPartitaiva(nuovo.getPartitaiva());
                        azienda.setIndirizzo(nuovo.getIndirizzo());
                        azienda.setComuneId(nuovo.getComuneId());
                        azienda.setCap(nuovo.getCap());
                        azienda.setTelefono(nuovo.getTelefono());
                        azienda.setEmail(nuovo.getEmail());
                        azienda.setUrlsito(nuovo.getUrlsito());
                        azienda.setSettoreAttivitaId(nuovo.getSettoreAttivitaId());
                        azienda.setApproved(nuovo.getApproved());
                        azienda.setCreatedat(nuovo.getCreatedat());
                        azienda.setUpdatedat(nuovo.getUpdatedat());
                        azienda.setDeletedat(nuovo.getDeletedat());
                        azienda.setUsername(nuovo.getUsername());
                        azienda.setPassword(nuovo.getPassword());
                        azienda.setAgenziaid(nuovo.getAgenziaid());

                        return aziendaRepository.save(azienda);
                    })
                    .orElseGet(() -> {
                        nuovo.setId(id);
                        return aziendaRepository.save(nuovo);
                    });
        else
            throw new EntityNotFoundException("Azienda", id);
    }

    //delete
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Integer id){
        aziendaRepository.deleteById(id);
    }

}
