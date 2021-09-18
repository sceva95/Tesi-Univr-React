package com.tesi.farm.controller;

import com.tesi.farm.exception.EntityNotValidateException;
import com.tesi.farm.exception.EntityNotFoundException;
import com.tesi.farm.mail.CentroNotifiche;
import com.tesi.farm.models.agenzia.Agenzia;
import com.tesi.farm.models.agenzia.AgenziaRepository;
import com.tesi.farm.models.azienda.Azienda;
import com.tesi.farm.models.azienda.AziendaRepository;
import com.tesi.farm.models.comune.ComuneRepository;
import com.tesi.farm.models.richiesta.Richiesta;
import com.tesi.farm.models.richiesta.RichiestaCompleta;
import com.tesi.farm.models.richiesta.RichiestaCompletaRowMapper;
import com.tesi.farm.models.richiesta.RichiestaRepository;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.mail.MailException;
import org.springframework.web.bind.annotation.*;


import java.sql.Date;
import java.sql.PreparedStatement;
import java.util.Calendar;
import java.util.List;


@RestController
@RequestMapping("richiesta")
@CrossOrigin
public class RichiestaController {

    @Autowired
    private RichiestaRepository richiestaRepository;

    @Autowired
    private AgenziaRepository agenziaRepository;

    @Autowired
    private ComuneRepository comuneRepository;

    @Autowired
    private AziendaRepository aziendaRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private CentroNotifiche centroNotifiche;





    private boolean validate(Richiesta richiesta){
        if (aziendaRepository.findById(richiesta.getAgenziaid()).get().equals(null))
            return false;
        else if (agenziaRepository.findById(richiesta.getAgenziaid()).get().equals(null))
            return false;
        else if (comuneRepository.findById(richiesta.getComuneid()).get().equals(null))
            return false;
        else
            return true;
    }

    //CRUD
    //create
    @PostMapping("/create")
    public Richiesta create(@RequestBody Richiesta nuova){

            if(jdbcTemplate.update("INSERT INTO richiesta(titolo, descrizione, datainizio, datafine, compenso, numeroposizionirichieste, note, offrevitto, offrealloggio, offretrasporto, createdat, updatedat, deletedat, tipocontrattoid, comuneid, agenziaid, aziendaid, statoiterid) " +
                    "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
                    nuova.getTitolo(),

                    nuova.getDescrizione(),

                    nuova.getDataInizio(),
                    nuova.getDataFine(),
                    nuova.getCompenso(),
                    nuova.getNumeroPosizioniRichieste(),
                    nuova.getNote(),
                    nuova.getVitto(),
                    nuova.getAlloggio(),
                    nuova.getTrasporto(),
                    nuova.getCreatedat(),
                    nuova.getUpdatedat(),
                    nuova.getDeletedat(),
                    nuova.getTipocontrattoid(),
                    nuova.getComuneid(),

                    nuova.getAgenziaid(),

                    nuova.getAziendaid(),

                    nuova.getStatoiterid()
                    ) == 1)
                return nuova;
        throw new EntityNotValidateException("Richiesta");
    }

    @PostMapping("/create_returning_id")
    public int save (@RequestBody Richiesta nuova) {

        // insert query
        String insertSql =
                "INSERT INTO richiesta(titolo, descrizione, datainizio, datafine, compenso, numeroposizionirichieste, note, offrevitto, offrealloggio, offretrasporto, createdat, updatedat, deletedat, tipocontrattoid, comuneid, agenziaid, aziendaid, statoiterid) " +
                        "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

        // this is the key holder
        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();

        // the name of the generated column (you can track more than one column)
        String id_column = "id";

        // the update method takes an implementation of PreparedStatementCreator which could be a lambda
        jdbcTemplate.update(con -> {
                    PreparedStatement ps = con.prepareStatement(insertSql, new String[]{id_column});
                    ps.setString(1, nuova.getTitolo());
                    ps.setString(2, nuova.getDescrizione());
                    ps.setDate(3, nuova.getDataInizio());
                    ps.setDate(4, nuova.getDataFine());
                    ps.setDouble(5, nuova.getCompenso());
                    ps.setInt(6, nuova.getNumeroPosizioniRichieste());
                    ps.setString(7, nuova.getNote());
                    ps.setString(8, nuova.getVitto());
                    ps.setString(9, nuova.getAlloggio());
                    ps.setString(10, nuova.getTrasporto());
                    ps.setDate(11, nuova.getCreatedat());
                    ps.setDate(12, nuova.getUpdatedat());
                    ps.setDate(13, nuova.getDeletedat());
                    ps.setInt(14, nuova.getTipocontrattoid());
                    ps.setInt(15, nuova.getComuneid());
                    ps.setInt(16, nuova.getAgenziaid());
                    ps.setInt(17, nuova.getAziendaid());
                    ps.setInt(18, nuova.getStatoiterid());
                    return ps;
                }
                , keyHolder);

        // after the update executed we can now get the value of the generated ID
        int id =(Integer)keyHolder.getKeys().get(id_column);

        //invio notifica ad agenzia
        Azienda sender = aziendaRepository.findById(nuova.getAziendaid()).get();
        try{
            centroNotifiche.senMail(sender.getEmail(), "Nuova richiesta inserita!", "L'utente " + sender.getRagioneSociale() + " ha inserito una nuova richiesta!");
        }catch (MailException e){

        }finally {
            return id;
        }

    }

    @PostMapping("/update_returning_id")
    public int update(@RequestBody Richiesta nuova) {


        // insert query
        String insertSql =
                "update richiesta set titolo=?, descrizione=?, datainizio=?, datafine=?, compenso=?, numeroposizionirichieste=?, note=?, offrevitto=?, offrealloggio=?, offretrasporto=?, updatedat=?, tipocontrattoid=?, comuneid=? where id=?";

        // this is the key holder
        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();

        // the name of the generated column (you can track more than one column)
        String id_column = "id";

        // the update method takes an implementation of PreparedStatementCreator which could be a lambda
        jdbcTemplate.update(con -> {
                    PreparedStatement ps = con.prepareStatement(insertSql, new String[]{id_column});
                    ps.setString(1, nuova.getTitolo());
                    ps.setString(2, nuova.getDescrizione());
                    ps.setDate(3, nuova.getDataInizio());
                    ps.setDate(4, nuova.getDataFine());
                    ps.setDouble(5, nuova.getCompenso());
                    ps.setInt(6, nuova.getNumeroPosizioniRichieste());
                    ps.setString(7, nuova.getNote());
                    ps.setString(8, nuova.getVitto());
                    ps.setString(9, nuova.getAlloggio());
                    ps.setString(10, nuova.getTrasporto());
                    ps.setDate(11, nuova.getUpdatedat());
                    ps.setInt(12, nuova.getTipocontrattoid());
                    ps.setInt(13, nuova.getComuneid());
                    ps.setInt(14, nuova.getId());
                    return ps;
                }
                , keyHolder);

        // after the update executed we can now get the value of the generated ID
        int id =(Integer)keyHolder.getKeys().get(id_column);
        return id;
    }

    @PostMapping("/update/stato/{richiestaid}")
    public int updateStato(@RequestBody Richiesta richiesta, @PathVariable int richiestaid){
        String sql= "update richiesta set statoiterid=?, updatedat=? where id=? ;";
        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        String id_column = "statoiterid";
        jdbcTemplate.update(con -> {
                    PreparedStatement ps = con.prepareStatement(sql, new String[]{id_column});
                    ps.setInt(1, richiesta.getStatoiterid());
                    ps.setDate(2, richiesta.getUpdatedat());
                    ps.setInt(3, richiestaid);
                    return ps;
                }
                , keyHolder);
        int id =(Integer)keyHolder.getKeys().get(id_column);
        return id;
    }

    @PostMapping("/update/stato/notifica/{richiestaid}")
    public int updateStatoNotifica(@RequestBody Richiesta richiesta, @PathVariable int richiestaid){
        String sql= "update richiesta set statoiterid=?, updatedat=? where id=? ;";
        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        String id_column = "statoiterid";
        jdbcTemplate.update(con -> {
                    PreparedStatement ps = con.prepareStatement(sql, new String[]{id_column});
                    ps.setInt(1, richiesta.getStatoiterid());
                    ps.setDate(2, richiesta.getUpdatedat());
                    ps.setInt(3, richiestaid);
                    return ps;
                }
                , keyHolder);
        int id =(Integer)keyHolder.getKeys().get(id_column);

        Richiesta r = richiestaRepository.findById(richiestaid).get();
        Agenzia a = agenziaRepository.findById(r.getAgenziaid()).get();
        Azienda az = aziendaRepository.findById(r.getAziendaid()).get();
        String testo = "";
        if(r.getStatoiterid()==3) //richiesta accettata ==> inviati un numero di lavoratori >= ai lavoratori richiesti
            testo= "Siamo lieti di avvertirla che l'agenzia: " + a.getRagioneSociale() + " ha inviato dei candidati per la richiesta: " + r.getId() + ".\nBuona Giornata\nFarmApp";
        else if(r.getStatoiterid() == 2)
            testo= "Siamo lieti di avvertirla che l'agenzia: " + a.getRagioneSociale() + " ha deciso di accettare la richiesta: " + r.getId() + ".\nBuona Giornata\nFarmApp";
        else
            return id;
        try{
            centroNotifiche.senMail( az.getEmail(), "Richiesta accettata", testo );
        }catch (MailException e){
            e.printStackTrace();
        }finally {
            return id;
        }
    }

    @PostMapping("/update/deletedat/{richiestaid}")
    public Date updateDeleted(@RequestBody Richiesta richiesta, @PathVariable int richiestaid){
        String sql= "update richiesta set deletedat=?, updatedat=? where id=? ;";
        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        String id_column = "deletedat";
        jdbcTemplate.update(con -> {
                    PreparedStatement ps = con.prepareStatement(sql, new String[]{id_column});
                    ps.setDate(1, richiesta.getDeletedat());
                    ps.setDate(2, richiesta.getUpdatedat());
                    ps.setInt(3, richiestaid);
                    return ps;
                }
                , keyHolder);
        Date id =(Date) keyHolder.getKeys().get(id_column);
        return id;
    }

    @PostMapping("/deletedat/agenzia/{richiestaid}")
    public Date updateDeletedWithNotification(@RequestBody Richiesta richiesta, @PathVariable int richiestaid){
        String sql= "update richiesta set deletedat=?, updatedat=? where id=? ;";
        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        String id_column = "deletedat";
        jdbcTemplate.update(con -> {
                    PreparedStatement ps = con.prepareStatement(sql, new String[]{id_column});
                    ps.setDate(1, richiesta.getDeletedat());
                    ps.setDate(2, richiesta.getUpdatedat());
                    ps.setInt(3, richiestaid);
                    return ps;
                }
                , keyHolder);
        Date id =(Date) keyHolder.getKeys().get(id_column);


        Richiesta r = richiestaRepository.findById(richiestaid).get();
        Agenzia a = agenziaRepository.findById(r.getAgenziaid()).get();
        Azienda az = aziendaRepository.findById(r.getAziendaid()).get();
        String testo= "Ci dispiace ma l'agenzia: " + a.getRagioneSociale() + " ha deciso di eliminare la richiesta: " + r.getId() + " per il seguente motivo: \n\n" + richiesta.getDescrizione()+ "\n\nCi scusiamo per l'incoveniente e la incoraggiamo a riprovare.\nBuona Giornata\nFarmApp";
        try{
            centroNotifiche.senMail( az.getEmail(), "Richiesta eliminata", testo );
        }catch (MailException e){
                e.printStackTrace();
        }finally {
            return id;
        }


    }

    //read
    @GetMapping("/read/completa/{id}")
    public RichiestaCompleta readOne(@PathVariable Integer id){
        String sql = "select r.id, r.titolo, (select count(*) from lavoratorerichiesta where richiestaid=r.id and statoid=2) as lavoratoriaccettati, r.descrizione, r.datainizio, r.datafine, r.compenso, r.numeroposizionirichieste, r.note, r.offrevitto, r.offrealloggio, r.offretrasporto, r.createdat, r.updatedat, r.deletedat, t.descrizione as tipocontratto, t.id as tipocontrattoid, c.denominazione_italiana_e_straniera as comune, r.comuneid, c.provincia as provincia, c.sigla_automobilistica as sigla_automobilistica, r.agenziaid, r.aziendaid, s.descrizione as statoiter, az.ragionesociale as aziendaragionesociale, ag.ragionesociale as agenziaragionesociale from richiesta r JOIN statoiter s on r.statoiterid=s.id JOIN tipocontratto t on r.tipocontrattoid=t.id JOIN comune c on r.comuneid=c.codice_comune_formato_numerico JOIN azienda az ON az.id=r.aziendaid JOIN agenzia ag ON ag.id=r.agenziaid WHERE r.id=" + id + " order by (r.createdat, r.datainizio, r.datafine);";
        return jdbcTemplate.queryForObject(sql,
                new RichiestaCompletaRowMapper());
    }

    @GetMapping("/read/all")
    public List<Richiesta> readAll(){
        return richiestaRepository.findAll();
    }

    @GetMapping("/read/all/{aziendaid}")
    public List<Richiesta> readAllByAziendaId(@PathVariable int aziendaid){
        return richiestaRepository.findAllByAziendaid(aziendaid);
    }

    @GetMapping("/read/all/completa/azienda/{aziendaid}")
    public List<RichiestaCompleta> readAllCompletaAzienda(@PathVariable int aziendaid){
        String sql = "select r.id, r.titolo, r.descrizione, r.datainizio, r.datafine, r.compenso, r.numeroposizionirichieste, r.note, r.offrevitto, r.offrealloggio, r.offretrasporto, r.createdat, r.updatedat, r.deletedat, t.descrizione as tipocontratto, t.id as tipocontrattoid, c.denominazione_italiana_e_straniera as comune, r.comuneid, c.provincia as provincia, c.sigla_automobilistica as sigla_automobilistica, r.agenziaid, r.aziendaid, s.descrizione as statoiter, (select count(*) from lavoratorerichiesta where richiestaid=r.id and statoid=2) as lavoratoriaccettati, az.ragionesociale as aziendaragionesociale, ag.ragionesociale as agenziaragionesociale from richiesta r JOIN statoiter s on r.statoiterid=s.id JOIN tipocontratto t on r.tipocontrattoid=t.id JOIN comune c on r.comuneid=c.codice_comune_formato_numerico JOIN azienda az ON az.id=r.aziendaid JOIN agenzia ag ON ag.id=r.agenziaid WHERE r.aziendaid=" + aziendaid + " order by (r.createdat, r.datainizio, r.datafine);";
        return jdbcTemplate.query(sql,
                new RichiestaCompletaRowMapper());
    }

    @GetMapping("/read/all/completa/agenzia/{agenziaid}")
    public List<RichiestaCompleta> readAllCompletaAgenzia(@PathVariable int agenziaid){
        String sql = "select r.id, r.titolo, r.descrizione, r.datainizio, r.datafine, r.compenso, r.numeroposizionirichieste, r.note, r.offrevitto, r.offrealloggio, r.offretrasporto, r.createdat, r.updatedat, r.deletedat, t.descrizione as tipocontratto, t.id as tipocontrattoid, c.denominazione_italiana_e_straniera as comune, r.comuneid, c.provincia as provincia, c.sigla_automobilistica as sigla_automobilistica, r.agenziaid, r.aziendaid, s.descrizione as statoiter, az.ragionesociale as aziendaragionesociale, ag.ragionesociale as agenziaragionesociale, (select count(*) from lavoratorerichiesta where richiestaid=r.id and statoid=2) as lavoratoriaccettati from richiesta r JOIN statoiter s on r.statoiterid=s.id JOIN tipocontratto t on r.tipocontrattoid=t.id JOIN comune c on r.comuneid=c.codice_comune_formato_numerico JOIN azienda az ON az.id=r.aziendaid JOIN agenzia ag ON ag.id=r.agenziaid WHERE r.agenziaid=" + agenziaid + " order by (r.createdat, r.datainizio, r.datafine);";
        return jdbcTemplate.query(sql,
                new RichiestaCompletaRowMapper());
    }

    //update
    @PutMapping("/update/{id}")
    public Richiesta updateRichiesta(@RequestBody Richiesta nuovo, @PathVariable Integer id) {
            return richiestaRepository.findById(id)
                    .map(richiesta -> {
                        richiesta.setTitolo(nuovo.getTitolo());
                        richiesta.setDescrizione(nuovo.getDescrizione());
                        richiesta.setDataInizio(nuovo.getDataInizio());
                        richiesta.setDataFine(nuovo.getDataFine());
                        richiesta.setComuneid(nuovo.getComuneid());
                        richiesta.setCompenso(nuovo.getCompenso());
                        richiesta.setNumeroPosizioniRichieste(nuovo.getNumeroPosizioniRichieste());
                        richiesta.setNote(nuovo.getNote());

                        richiesta.setVitto(nuovo.getVitto());
                        richiesta.setAlloggio(nuovo.getAlloggio());
                        richiesta.setTrasporto(nuovo.getTrasporto());
                        richiesta.setCreatedat(nuovo.getCreatedat());
                        richiesta.setUpdatedat(nuovo.getUpdatedat());
                        richiesta.setDeletedat(nuovo.getDeletedat());
                        richiesta.setComuneid(nuovo.getComuneid());

                        richiesta.setAgenziaid(nuovo.getAgenziaid());
                        richiesta.setAziendaid(nuovo.getAziendaid());
                        richiesta.setStatoiterid(nuovo.getStatoiterid());
                        return richiestaRepository.save(richiesta);
                    })
                    .orElseGet(() -> {
                        nuovo.setId(id);
                        return richiestaRepository.save(nuovo);
                    });

    }

    //delete
    @GetMapping("/delete/{id}")
    public Richiesta delete(@PathVariable Integer id) {
        Richiesta richiesta = richiestaRepository.findById(id).get();
        Calendar calendar = Calendar.getInstance();

        java.util.Date currentDate = calendar.getTime();


        java.sql.Date date = new java.sql.Date(currentDate.getTime());

        //imposto la data corrente e lo stato iter == 5 --> cancellata
        richiesta.setDeletedat(date);
        richiesta.setStatoiterid(5);

        return richiestaRepository.save(richiesta);

    }
}
