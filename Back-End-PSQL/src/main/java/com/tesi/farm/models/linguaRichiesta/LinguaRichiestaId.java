package com.tesi.farm.models.linguaRichiesta;

import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class LinguaRichiestaId implements Serializable {

    private int linguaid;

    private int richiestaid;

    public LinguaRichiestaId(int linguaid, int richiestaid) {
        this.linguaid = linguaid;
        this.richiestaid = richiestaid;
    }

    public LinguaRichiestaId() {

    }

    //getter and setter

    public int getLinguaid() {
        return linguaid;
    }

    public void setLinguaid(int linguaid) {
        this.linguaid = linguaid;
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
        LinguaRichiestaId that = (LinguaRichiestaId) o;
        return linguaid == that.linguaid &&
                richiestaid == that.richiestaid;
    }

    @Override
    public int hashCode() {
        return Objects.hash(linguaid, richiestaid);
    }
}
