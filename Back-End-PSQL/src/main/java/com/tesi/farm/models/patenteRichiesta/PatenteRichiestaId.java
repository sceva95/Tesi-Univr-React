package com.tesi.farm.models.patenteRichiesta;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class PatenteRichiestaId implements Serializable {

    @Column(name ="patente")
    private String patente;

    @Column(name ="richiestaid")
    private int richiestaId;

    public PatenteRichiestaId(String patente, int richiestaId) {
        this.patente = patente;
        this.richiestaId = richiestaId;
    }

    public PatenteRichiestaId() {

    }

    public String getPatente() {
        return patente;
    }

    public void setPatente(String patente) {
        this.patente = patente;
    }

    public int getRichiestaId() {
        return richiestaId;
    }

    public void setRichiestaId(int richiestaId) {
        this.richiestaId = richiestaId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PatenteRichiestaId that = (PatenteRichiestaId) o;
        return richiestaId == that.richiestaId &&
                Objects.equals(patente, that.patente);
    }

    @Override
    public int hashCode() {
        return Objects.hash(patente, richiestaId);
    }
}
