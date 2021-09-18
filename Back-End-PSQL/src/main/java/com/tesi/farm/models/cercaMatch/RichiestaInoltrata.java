package com.tesi.farm.models.cercaMatch;

import java.sql.Date;

public class RichiestaInoltrata {

    private int idRichiesta;

    private Date datainizio;

    private Date datafine;

    private String offrevitto;

    private String offreAlloggio;

    private String offreTrasporto;

    private int idAgenzia;

    public int getIdAgenzia() {
        return idAgenzia;
    }

    public void setIdAgenzia(int idAgenzia) {
        this.idAgenzia = idAgenzia;
    }

    public int getIdRichiesta() {
        return idRichiesta;
    }

    public void setIdRichiesta(int idRichiesta) {
        this.idRichiesta = idRichiesta;
    }

    public Date getDatainizio() {
        return datainizio;
    }

    public void setDatainizio(Date datainizio) {
        this.datainizio = datainizio;
    }

    public Date getDatafine() {
        return datafine;
    }

    public void setDatafine(Date datafine) {
        this.datafine = datafine;
    }

    public String getOffrevitto() {
        return offrevitto;
    }

    public void setOffrevitto(String offrevitto) {
        this.offrevitto = offrevitto;
    }

    public String getOffreAlloggio() {
        return offreAlloggio;
    }

    public void setOffreAlloggio(String offreAlloggio) {
        this.offreAlloggio = offreAlloggio;
    }

    public String getOffreTrasporto() {
        return offreTrasporto;
    }

    public void setOffreTrasporto(String offreTrasporto) {
        this.offreTrasporto = offreTrasporto;
    }
}
