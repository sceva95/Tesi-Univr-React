package com.tesi.farm.models.richiestaCompetenza;

import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class RichiestaCompetenzaId implements Serializable {

    private int competenzaid;

    private int richiestaid;

    public RichiestaCompetenzaId(int competenzaid, int richiestaid) {
        this.competenzaid = competenzaid;
        this.richiestaid = richiestaid;
    }

    public RichiestaCompetenzaId() {

    }

    //getter and setter

    public int getCompetenzaid() {
        return competenzaid;
    }

    public void setCompetenzaid(int competenzaid) {
        this.competenzaid = competenzaid;
    }

    public int getRichiestaid() {
        return richiestaid;
    }

    public void setRichiestaid(int richiestaid) {
        this.richiestaid = richiestaid;
    }

    //equals and hashcode

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RichiestaCompetenzaId that = (RichiestaCompetenzaId) o;
        return competenzaid == that.competenzaid &&
                richiestaid == that.richiestaid;
    }

    @Override
    public int hashCode() {
        return Objects.hash(competenzaid, richiestaid);
    }
}
