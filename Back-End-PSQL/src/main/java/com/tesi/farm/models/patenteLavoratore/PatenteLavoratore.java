package com.tesi.farm.models.patenteLavoratore;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import java.util.Objects;

@Entity(name ="patentelavoratore")
public class PatenteLavoratore {

    @EmbeddedId
    private PatenteLavoratoreId id;

    public PatenteLavoratoreId getId() {
        return id;
    }

    public void setPatenteLavoratoreId(PatenteLavoratoreId patenteLavoratoreId) {
        this.id = patenteLavoratoreId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PatenteLavoratore that = (PatenteLavoratore) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
