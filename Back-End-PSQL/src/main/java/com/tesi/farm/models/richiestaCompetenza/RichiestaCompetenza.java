package com.tesi.farm.models.richiestaCompetenza;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity(name ="richiestacompetenza")
public class RichiestaCompetenza {

    @EmbeddedId
    private RichiestaCompetenzaId id;

    @Column(name="priorita")
    private int priorita;

    public RichiestaCompetenzaId getId() {
        return id;
    }

    public void setId(RichiestaCompetenzaId id) {
        this.id = id;
    }

    public int getPriorita() {
        return priorita;
    }

    public void setPriorita(int priorita) {
        this.priorita = priorita;
    }
}
