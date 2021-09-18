package com.tesi.farm.models.lavoratoreRichiesta;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import java.sql.Date;
import java.util.Objects;

@Entity(name ="lavoratorerichiesta")
public class LavoratoreRichiesta {

    @EmbeddedId
    private LavoratoreRichiestaId id;

    @Column(name ="dataaggiornamento")
    private Date dataAggiornamento;


    //getter and setter
    public LavoratoreRichiestaId getId() {
        return id;
    }

    public void setId(LavoratoreRichiestaId id) {
        this.id = id;
    }

    public Date getDataAggiornamento() {
        return dataAggiornamento;
    }

    public void setDataAggiornamento(Date dataAggiornamento) {
        this.dataAggiornamento = dataAggiornamento;
    }

    //equals and hashcode

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LavoratoreRichiesta that = (LavoratoreRichiesta) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(dataAggiornamento, that.dataAggiornamento);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, dataAggiornamento);
    }
}
