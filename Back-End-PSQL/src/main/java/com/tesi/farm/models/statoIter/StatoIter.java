package com.tesi.farm.models.statoIter;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Objects;

@Entity(name ="statoiter")
public class StatoIter {

    @Id
    @Column(name ="ID")
    private int id;

    @Column(name ="descrizione")
    private String descrizione;

    //getter and setter

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDescrizione() {
        return descrizione;
    }

    public void setDescrizione(String descrizione) {
        this.descrizione = descrizione;
    }

    //equals and hashcode

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        StatoIter statoIter = (StatoIter) o;
        return id == statoIter.id &&
                Objects.equals(descrizione, statoIter.descrizione);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, descrizione);
    }
}
