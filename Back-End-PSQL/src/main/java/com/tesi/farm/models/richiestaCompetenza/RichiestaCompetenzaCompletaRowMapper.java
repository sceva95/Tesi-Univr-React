package com.tesi.farm.models.richiestaCompetenza;

import com.tesi.farm.models.linguaRichiesta.LinguaRichiestaCompleta;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class RichiestaCompetenzaCompletaRowMapper implements RowMapper<RichiestaCompetenzaCompleta> {

    @Override
    public RichiestaCompetenzaCompleta mapRow(ResultSet rs, int rowNum) throws SQLException {
        RichiestaCompetenzaCompleta richiestaCompetenzaCompleta = new RichiestaCompetenzaCompleta();
        richiestaCompetenzaCompleta.setId(rs.getInt("id"));
        richiestaCompetenzaCompleta.setDescrizione(rs.getString("descrizione"));
        richiestaCompetenzaCompleta.setPriorita(rs.getInt("priorita"));
        return richiestaCompetenzaCompleta;
    }
}