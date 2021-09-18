package com.tesi.farm.models.linguaRichiesta;

import org.springframework.jdbc.core.RowMapper;
import java.sql.ResultSet;
import java.sql.SQLException;

public class LinguaRichiestaCompletaRowMapper implements RowMapper<LinguaRichiestaCompleta> {

    @Override
    public LinguaRichiestaCompleta mapRow(ResultSet rs, int rowNum) throws SQLException {
        LinguaRichiestaCompleta linguaRichiestaCompleta = new LinguaRichiestaCompleta();
        linguaRichiestaCompleta.setId(rs.getInt("id"));
        linguaRichiestaCompleta.setDescrizione(rs.getString("descrizione"));
        linguaRichiestaCompleta.setLivelloLinguistico(rs.getString("livellolinguisticorichiesto"));
        return linguaRichiestaCompleta;
    }
}
