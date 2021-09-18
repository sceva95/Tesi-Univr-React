package com.tesi.farm.models.lavoratoreRichiesta;

import java.sql.Date;

public class LavoratoreRIchiestaReset {

    private Date datafine;

    private int agenziaid;

    private Date dataaggiornamento;

    public Date getDataaggiornamento() {
        return dataaggiornamento;
    }

    public void setDataaggiornamento(Date dataaggiornamento) {
        this.dataaggiornamento = dataaggiornamento;
    }

    public Date getDatafine() {
        return datafine;
    }

    public void setDatafine(Date datafine) {
        this.datafine = datafine;
    }

    public int getAgenziaid() {
        return agenziaid;
    }

    public void setAgenziaid(int agenziaid) {
        this.agenziaid = agenziaid;
    }
}
