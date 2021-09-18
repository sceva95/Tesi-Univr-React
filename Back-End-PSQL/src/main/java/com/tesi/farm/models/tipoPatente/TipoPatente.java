package com.tesi.farm.models.tipoPatente;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Objects;


@Entity(name ="tipopatente")
public class TipoPatente {

    @Id
    @Column(name ="siglapatente")
    private String siglaPatente;

    @Column(name ="descrizione")
    private String descrizione;

    //getter and setter

    public String getSiglaPatente() {
        return siglaPatente;
    }

    public void setSiglaPatente(String siglaPatente) {
        this.siglaPatente = siglaPatente;
    }

    public String getDescrizione() {
        return descrizione;
    }

    public void setDescrizione(String descrizione) {
        this.descrizione = descrizione;
    }

    //equals and hashcode

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TipoPatente that = (TipoPatente) o;
        return Objects.equals(siglaPatente, that.siglaPatente) &&
                Objects.equals(descrizione, that.descrizione);
    }

    @Override
    public int hashCode() {
        return Objects.hash(siglaPatente, descrizione);
    }


}
