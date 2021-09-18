package com.tesi.farm.models.lavoratoreRichiesta;

import com.tesi.farm.models.linguaRichiesta.LinguaRichiestaCompleta;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class LavoratorePropostoRowMapper implements RowMapper<LavoratoreProposto> {

    @Override
    public LavoratoreProposto mapRow(ResultSet rs, int rowNum) throws SQLException {
        LavoratoreProposto lavoratoreProposto = new LavoratoreProposto();
        lavoratoreProposto.setId(rs.getInt("id"));
        lavoratoreProposto.setNome(rs.getString("nome"));
        lavoratoreProposto.setCognome(rs.getString("cognome"));
        lavoratoreProposto.setDatadinascita(rs.getDate("datadinascita"));
        lavoratoreProposto.setNazionalita(rs.getString("nazionalita"));
        lavoratoreProposto.setSesso(rs.getString("sesso"));
        lavoratoreProposto.setEmail(rs.getString("email"));
        lavoratoreProposto.setTelefono(rs.getString("telefono"));
        lavoratoreProposto.setStatoid(rs.getInt("statoid"));
        lavoratoreProposto.setStatusgiuridico(rs.getString("statusgiuridico"));
        return lavoratoreProposto;
    }
}
