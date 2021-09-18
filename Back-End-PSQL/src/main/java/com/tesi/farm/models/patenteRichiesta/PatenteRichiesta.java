package com.tesi.farm.models.patenteRichiesta;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import java.util.Objects;

@Entity(name ="patenterichiesta")
public class PatenteRichiesta {

    @EmbeddedId
    private PatenteRichiestaId id;

    public PatenteRichiestaId getId() {
        return id;
    }

    public void setId(PatenteRichiestaId patenteRichiestaId) {
        this.id = patenteRichiestaId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PatenteRichiesta that = (PatenteRichiesta) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
