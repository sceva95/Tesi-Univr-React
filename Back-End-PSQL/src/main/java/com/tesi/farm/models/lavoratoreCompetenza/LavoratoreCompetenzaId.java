package com.tesi.farm.models.lavoratoreCompetenza;

import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class LavoratoreCompetenzaId implements Serializable {

    private int competenzaid;

    private int lavoratoreid;

    public LavoratoreCompetenzaId(){

    }

    public LavoratoreCompetenzaId(int competenzaid, int lavoratoreid){
        this.competenzaid = competenzaid;
        this.lavoratoreid = lavoratoreid;
    }

    public int getCompetenzaid() {
        return competenzaid;
    }

    public void setCompetenzaid(int competenzaid) {
        this.competenzaid = competenzaid;
    }

    public int getLavoratoreid() {
        return lavoratoreid;
    }

    public void setLavoratoreid(int lavoratoreid) {
        this.lavoratoreid = lavoratoreid;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LavoratoreCompetenzaId that = (LavoratoreCompetenzaId) o;
        return competenzaid == that.competenzaid &&
                lavoratoreid == that.lavoratoreid;
    }

    @Override
    public int hashCode() {
        return Objects.hash(competenzaid, lavoratoreid);
    }
}
