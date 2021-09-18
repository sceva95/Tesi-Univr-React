package com.tesi.farm.models.patenteLavoratore;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class PatenteLavoratoreId implements Serializable {

    private String patente;

    @Column(name ="lavoratoreid")
    private int lavoratoreId;

    public PatenteLavoratoreId(String patente, int lavoratoreId) {
        this.patente = patente;
        this.lavoratoreId = lavoratoreId;
    }

    public PatenteLavoratoreId() {

    }

    public String getPatente() {
        return patente;
    }

    public void setPatente(String patente) {
        this.patente = patente;
    }

    public int getLavoratoreId() {
        return lavoratoreId;
    }

    public void setLavoratoreId(int lavoratoreId) {
        this.lavoratoreId = lavoratoreId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PatenteLavoratoreId that = (PatenteLavoratoreId) o;
        return lavoratoreId == that.lavoratoreId &&
                Objects.equals(patente, that.patente);
    }

    @Override
    public int hashCode() {
        return Objects.hash(patente, lavoratoreId);
    }
}
