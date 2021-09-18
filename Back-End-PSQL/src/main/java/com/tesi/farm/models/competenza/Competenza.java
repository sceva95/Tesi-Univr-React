package com.tesi.farm.models.competenza;



import javax.persistence.*;
import java.util.Objects;

@Entity(name ="competenza")
public class Competenza {

    @Id
    @Column(name ="ID")
    private int id;

    @Column(name="descrizione")
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

    //equals e hashcode

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Competenza competenza = (Competenza) o;
        return id == competenza.id &&
                Objects.equals(descrizione, competenza.descrizione);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, descrizione);
    }
}

