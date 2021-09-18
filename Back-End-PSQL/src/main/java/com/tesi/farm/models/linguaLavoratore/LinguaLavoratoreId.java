package com.tesi.farm.models.linguaLavoratore;

import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class LinguaLavoratoreId implements Serializable {

    private int linguaid;

    private int lavoratoreid;

    public LinguaLavoratoreId(int linguaid, int lavoratoreid) {
        this.linguaid = linguaid;
        this.lavoratoreid = lavoratoreid;
    }

    public LinguaLavoratoreId() {

    }

    public int getLinguaid() {
        return linguaid;
    }

    public void setLinguaid(int linguaid) {
        this.linguaid = linguaid;
    }

    public int getLavoratoreid() {
        return lavoratoreid;
    }

    public void setLavoratoreid(int lavoratoreid) {
        this.lavoratoreid = lavoratoreid;
    }

    //equals and hashcode

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LinguaLavoratoreId that = (LinguaLavoratoreId) o;
        return linguaid == that.linguaid &&
                lavoratoreid == that.lavoratoreid;
    }

    @Override
    public int hashCode() {
        return Objects.hash(linguaid, lavoratoreid);
    }
}
