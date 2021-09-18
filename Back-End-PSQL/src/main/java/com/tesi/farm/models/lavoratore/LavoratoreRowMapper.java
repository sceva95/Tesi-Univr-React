package com.tesi.farm.models.lavoratore;

import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class LavoratoreRowMapper implements RowMapper<Lavoratore> {

    @Override
    public Lavoratore mapRow(ResultSet rs, int rowNum) throws SQLException {
        Lavoratore lavoratoreCompletoAgenzia = new Lavoratore();
        lavoratoreCompletoAgenzia.setId(rs.getInt("id"));
        lavoratoreCompletoAgenzia.setNome(rs.getString("nome"));
        lavoratoreCompletoAgenzia.setCognome(rs.getString("cognome"));
        lavoratoreCompletoAgenzia.setSesso(rs.getString("sesso"));
        lavoratoreCompletoAgenzia.setDataDiNascita(rs.getDate("datadinascita"));
        lavoratoreCompletoAgenzia.setStatusGiuridico(rs.getString("statusgiuridico"));
        lavoratoreCompletoAgenzia.setCodiceFiscale(rs.getString("codicefiscale"));
        lavoratoreCompletoAgenzia.setIndirizzo(rs.getString("indirizzo"));
        lavoratoreCompletoAgenzia.setCap(rs.getString("cap"));
        lavoratoreCompletoAgenzia.setComuneid(rs.getInt("comuneid"));
        lavoratoreCompletoAgenzia.setTelefono(rs.getString("telefono"));
        lavoratoreCompletoAgenzia.setEmail(rs.getString("email"));
        lavoratoreCompletoAgenzia.setCreatedat(rs.getDate("createdat"));
        lavoratoreCompletoAgenzia.setUpdatedat(rs.getDate("updatedat"));
        lavoratoreCompletoAgenzia.setDeletedat(rs.getDate("deletedat"));
        lavoratoreCompletoAgenzia.setNazionalita(rs.getInt("nazionalità"));
        lavoratoreCompletoAgenzia.setAgenziaid(rs.getInt("agenziaid"));

        return lavoratoreCompletoAgenzia;
    }
}
