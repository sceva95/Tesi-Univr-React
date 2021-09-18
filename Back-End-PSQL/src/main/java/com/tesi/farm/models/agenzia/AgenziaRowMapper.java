package com.tesi.farm.models.agenzia;

import com.tesi.farm.models.azienda.Azienda;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class AgenziaRowMapper implements RowMapper<Agenzia> {
    @Override

    public Agenzia mapRow(ResultSet rs, int rowNum) throws SQLException {
        Agenzia agenzia = new Agenzia();
        agenzia.setId(rs.getInt("id"));
        agenzia.setRagioneSociale(rs.getString("ragionesociale"));
        agenzia.setIndirizzo(rs.getString(("indirizzo")));
        agenzia.setComuneId(rs.getInt("comuneID"));
        agenzia.setCap(rs.getString("CAP"));
        agenzia.setTelefono(rs.getString("telefono"));
        agenzia.setEmail(rs.getString("email"));
        agenzia.setUrlsito(rs.getString("URLsito"));
        agenzia.setUsername(rs.getString("username"));
        agenzia.setPassword(rs.getString("password"));
        agenzia.setCreatedat(rs.getDate("createdat"));
        agenzia.setUpdatedat(rs.getDate("updatedat"));
        return agenzia;
    }
}