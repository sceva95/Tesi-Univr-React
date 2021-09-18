package com.tesi.farm.models.linguaRichiesta;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import java.util.Objects;

@Entity(name ="linguarichiesta")
public class LinguaRichiesta {

    @EmbeddedId
    private LinguaRichiestaId id;

    @Column(name ="livellolinguisticorichiesto", columnDefinition = "livellolinguistico")
    private String livelloLinguisticoRichiesto;

    //getter and setter

    public LinguaRichiestaId getId() {
        return id;
    }

    public void setId(LinguaRichiestaId id) {
        this.id = id;
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
        LinguaRichiesta that = (LinguaRichiesta) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(livelloLinguisticoRichiesto, that.livelloLinguisticoRichiesto);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, livelloLinguisticoRichiesto);
    }
}
