package com.tesi.farm.models.lavoratore;

import com.tesi.farm.models.lavoratoreRichiesta.LavoratoreProposto;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class LavoratoreCompletoAgenziaRowMapper implements RowMapper<LavoratoreCompletoAgenzia> {

    @Override
    public LavoratoreCompletoAgenzia mapRow(ResultSet rs, int rowNum) throws SQLException {
        LavoratoreCompletoAgenzia lavoratoreCompletoAgenzia = new LavoratoreCompletoAgenzia();
        lavoratoreCompletoAgenzia.setId(rs.getInt("id"));
        lavoratoreCompletoAgenzia.setNome(rs.getString("nome"));
        lavoratoreCompletoAgenzia.setCognome(rs.getString("cognome"));
        lavoratoreCompletoAgenzia.setSesso(rs.getString("sesso"));
        lavoratoreCompletoAgenzia.setDatadinascita(rs.getDate("datadinascita"));
        lavoratoreCompletoAgenzia.setStatusgiuridico(rs.getString("statusgiuridico"));
        lavoratoreCompletoAgenzia.setCodicefiscale(rs.getString("codicefiscale"));
        lavoratoreCompletoAgenzia.setIndirizzo(rs.getString("indirizzo"));
        lavoratoreCompletoAgenzia.setCap(rs.getString("cap"));
        lavoratoreCompletoAgenzia.setComune(rs.getString("comune"));
        lavoratoreCompletoAgenzia.setSiglaautomobilistica(rs.getString("sigla_automobilistica"));
        lavoratoreCompletoAgenzia.setTelefono(rs.getString("telefono"));
        lavoratoreCompletoAgenzia.setEmail(rs.getString("email"));
        lavoratoreCompletoAgenzia.setCreatedat(rs.getDate("createdat"));
        lavoratoreCompletoAgenzia.setUpdatedat(rs.getDate("updatedat"));
        lavoratoreCompletoAgenzia.setDeletedat(rs.getDate("deletedat"));
        lavoratoreCompletoAgenzia.setNazionalita(rs.getString("nazionalita"));
        lavoratoreCompletoAgenzia.setStatoid(rs.getInt("statoid"));
        lavoratoreCompletoAgenzia.setDataaggiornamento(rs.getDate("dataaggiornamento"));
        lavoratoreCompletoAgenzia.setRichiesta(rs.getInt("richiesta"));
        lavoratoreCompletoAgenzia.setDatafine(rs.getDate("datafine"));
        lavoratoreCompletoAgenzia.setDatainizio(rs.getDate("datainizio"));
        return lavoratoreCompletoAgenzia;
    }
}
