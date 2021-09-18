package com.tesi.farm.models.lavoratoreCompetenza;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import java.util.Objects;

@Entity(name ="lavoratorecompetenza")
public class LavoratoreCompetenza {

    @EmbeddedId
    private LavoratoreCompetenzaId lavoratoreCompetenzaId;

    public LavoratoreCompetenzaId getLavoratoreCompetenzaId() {
        return lavoratoreCompetenzaId;
    }

    public void setLavoratoreCompetenzaId(LavoratoreCompetenzaId lavoratoreCompetenzaId) {
        this.lavoratoreCompetenzaId = lavoratoreCompetenzaId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LavoratoreCompetenza that = (LavoratoreCompetenza) o;
        return Objects.equals(lavoratoreCompetenzaId, that.lavoratoreCompetenzaId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(lavoratoreCompetenzaId);
    }
}
