package com.tesi.farm.models.linguaLavoratore;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import java.util.Objects;

@Entity(name ="lingualavoratore")
public class LinguaLavoratore {

    @EmbeddedId
    private LinguaLavoratoreId id;

    @Column(name ="livellolinguisticorichiesto", columnDefinition = "livelloLinguistico")
    private String livelloLinguisticoRichiesto;

    //getter and setter

    public LinguaLavoratoreId getId() {
        return id;
    }

    public void setId(LinguaLavoratoreId linguaLavoratoreId) {
        this.id = linguaLavoratoreId;
    }

    public String getLivelloLinguisticoRichiesto() {
        return livelloLinguisticoRichiesto;
    }

    public void setLivelloLinguisticoRichiesto(String livelloLinguisticoRichiesto) {
        this.livelloLinguisticoRichiesto = livelloLinguisticoRichiesto;
    }

    //equals and hashcode

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LinguaLavoratore that = (LinguaLavoratore) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(livelloLinguisticoRichiesto, that.livelloLinguisticoRichiesto);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, livelloLinguisticoRichiesto);
    }
}
