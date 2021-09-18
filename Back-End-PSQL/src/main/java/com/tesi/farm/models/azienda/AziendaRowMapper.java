package com.tesi.farm.models.azienda;

import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class AziendaRowMapper implements RowMapper<Azienda> {
    @Override

        public Azienda mapRow(ResultSet rs, int rowNum) throws SQLException {
            Azienda azienda = new Azienda();
            azienda.setId(rs.getInt("id"));
            azienda.setRagioneSociale(rs.getString("ragionesociale"));
            azienda.setPartitaiva(rs.getString("partitaiva"));
            azienda.setIndirizzo(rs.getString(("indirizzo")));
            azienda.setComuneId(rs.getInt("comuneID"));
            azienda.setCap(rs.getString("CAP"));
            azienda.setTelefono(rs.getString("telefono"));
            azienda.setEmail(rs.getString("email"));
            azienda.setUrlsito(rs.getString("URLsito"));
            azienda.setSettoreAttivitaId(rs.getInt("settoreattivitaid"));
            azienda.setApproved(rs.getDate("approved"));
            azienda.setCreatedat(rs.getDate("createdat"));
            azienda.setUpdatedat(rs.getDate("updatedat"));
            azienda.setDeletedat(rs.getDate("deletedat"));
            azienda.setUsername(rs.getString("username"));
            azienda.setPassword(rs.getString("password"));
            azienda.setAgenziaid(rs.getInt("agenziaid"));
            return azienda;
        }
    }
