package com.tesi.farm.models.settoreAttivita;

import javax.persistence.*;
import java.util.Objects;

@Entity (name="settoreattivita")
public class SettoreAttivita {

    @Id
    @Column(name= "ID")
    private int id;

    @Column(name = "descrizione")
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
        SettoreAttivita that = (SettoreAttivita) o;
        return id == that.id &&
                Objects.equals(descrizione, that.descrizione);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, descrizione);
    }
}
