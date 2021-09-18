package com.tesi.farm.models.lavoratoreRichiesta;

import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class LavoratoreRichiestaId implements Serializable {

    private int lavoratoreid;

    private int richiestaid;

    private int statoid;

    public LavoratoreRichiestaId(int lavoratoreid, int richiestaid, int statoid) {
        this.lavoratoreid = lavoratoreid;
        this.richiestaid = richiestaid;
        this.statoid = statoid;
    }

    public LavoratoreRichiestaId() {

    }

    //getter and setter

    public int getLavoratoreid() {
        return lavoratoreid;
    }

    public void setLavoratoreid(int lavoratoreid) {
        this.lavoratoreid = lavoratoreid;
    }

    public int getRichiestaid() {
        return richiestaid;
    }

    public void setRichiestaid(int richiestaid) {
        this.richiestaid = richiestaid;
    }

    public int getStatoid() {
        return statoid;
    }

    public void setStatoid(int statoid) {
        this.statoid = statoid;
    }

    //equals and hashcode

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LavoratoreRichiestaId that = (LavoratoreRichiestaId) o;
        return lavoratoreid == that.lavoratoreid &&
                richiestaid == that.richiestaid &&
                statoid == that.statoid;
    }

    @Override
    public int hashCode() {
        return Objects.hash(lavoratoreid, richiestaid, statoid);
    }
}
