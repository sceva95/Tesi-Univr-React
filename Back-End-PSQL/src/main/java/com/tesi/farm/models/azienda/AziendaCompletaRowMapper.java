package com.tesi.farm.models.azienda;

import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class AziendaCompletaRowMapper implements RowMapper<AziendaCompleta> {
    @Override

    public AziendaCompleta mapRow(ResultSet rs, int rowNum) throws SQLException {
        AziendaCompleta aziendaCompleta = new AziendaCompleta();
        aziendaCompleta.setId(rs.getInt("id"));
        aziendaCompleta.setRagionesociale(rs.getString("ragionesociale"));
        aziendaCompleta.setPartitaiva(rs.getString("partitaiva"));
        aziendaCompleta.setIndirizzo(rs.getString("indirizzo"));
        aziendaCompleta.setComuneid(rs.getInt("comuneid"));
        aziendaCompleta.setCap(rs.getString("cap"));
        aziendaCompleta.setTelefono(rs.getString("telefono"));
        aziendaCompleta.setEmail(rs.getString("email"));
        aziendaCompleta.setUrlsito(rs.getString("urlsito"));
        aziendaCompleta.setSettoreattivitaid(rs.getInt("settoreattivitaid"));
        aziendaCompleta.setApproved(rs.getDate("approved"));
        aziendaCompleta.setCreatedat(rs.getDate("createdat"));
        aziendaCompleta.setUpdatedat(rs.getDate("updatedat"));
        aziendaCompleta.setDeletedat(rs.getDate("deletedat"));
        aziendaCompleta.setUsername(rs.getString("username"));
        aziendaCompleta.setAgenziaid(rs.getInt("agenziaid"));
        aziendaCompleta.setComune(rs.getString("comune"));
        aziendaCompleta.setProvincia(rs.getString("provincia"));
        aziendaCompleta.setSettoreattivita(rs.getString("settoreattivita"));
        return aziendaCompleta;
    }
}
