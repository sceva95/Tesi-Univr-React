package com.tesi.farm.models.richiesta;

import com.tesi.farm.models.azienda.Azienda;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class RichiestaCompletaRowMapper implements RowMapper<RichiestaCompleta> {
    @Override

    public RichiestaCompleta mapRow(ResultSet rs, int rowNum) throws SQLException {
        RichiestaCompleta richiestaCompleta = new RichiestaCompleta();
        richiestaCompleta.setId(rs.getInt("id"));
        richiestaCompleta.setTitolo(rs.getString("titolo"));
        richiestaCompleta.setDescrizione(rs.getString("descrizione"));
        richiestaCompleta.setDataInizio(rs.getDate(("datainizio")));
        richiestaCompleta.setDataFine(rs.getDate("datafine"));
        richiestaCompleta.setCompenso(rs.getDouble("compenso"));
        richiestaCompleta.setNumeroPosizioniRichieste(rs.getInt("numeroposizionirichieste"));
        richiestaCompleta.setNote(rs.getString("note"));
        richiestaCompleta.setVitto(rs.getString("offrevitto"));
        richiestaCompleta.setAlloggio(rs.getString("offrealloggio"));
        richiestaCompleta.setTrasporto(rs.getString("offretrasporto"));
        richiestaCompleta.setCreatedat(rs.getDate("createdat"));
        richiestaCompleta.setUpdatedat(rs.getDate("updatedat"));
        richiestaCompleta.setDeletedat(rs.getDate("deletedat"));
        richiestaCompleta.setComune(rs.getString("comune"));
        richiestaCompleta.setComuneid(rs.getInt("comuneid"));
        richiestaCompleta.setProvincia(rs.getString("provincia"));
        richiestaCompleta.setSigla_automobilistica(rs.getString("sigla_automobilistica"));
        richiestaCompleta.setAziendaid(rs.getInt("aziendaid"));
        richiestaCompleta.setAgenziaid(rs.getInt("agenziaid"));
        richiestaCompleta.setStatoiter(rs.getString("statoiter"));
        richiestaCompleta.setTipocontratto(rs.getString("tipocontratto"));
        richiestaCompleta.setAgenziaRagioneSociale(rs.getString("agenziaragionesociale"));
        richiestaCompleta.setAziendaRagioneSociale(rs.getString("aziendaragionesociale"));
        richiestaCompleta.setTipoContrattoId(rs.getInt("tipocontrattoid"));
        richiestaCompleta.setLavoratoriaccettati(rs.getInt("lavoratoriaccettati"));
        return richiestaCompleta;
    }
}

