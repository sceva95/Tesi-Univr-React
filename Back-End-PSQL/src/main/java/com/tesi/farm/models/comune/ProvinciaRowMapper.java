package com.tesi.farm.models.comune;

import com.tesi.farm.models.azienda.Azienda;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ProvinciaRowMapper implements RowMapper<Provincia> {
    @Override

    public Provincia mapRow(ResultSet rs, int rowNum) throws SQLException {
        Provincia provincia= new Provincia();
        provincia.setProvincia(rs.getString("provincia"));
        provincia.setSigla_automobilistica(rs.getString("sigla_automobilistica"));
        return provincia;
    }
}
