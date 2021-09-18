package com.tesi.farm.models.linguaRichiesta;

public class LinguaRichiestaCompleta {

    private int id;

    private String descrizione;

    private String livelloLinguistico;

    public String getDescrizione() {
        return descrizione;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setDescrizione(String descrizione) {
        this.descrizione = descrizione;
    }

    public String getLivelloLinguistico() {
        return livelloLinguistico;
    }

    public void setLivelloLinguistico(String livelloLinguistico) {
        this.livelloLinguistico = livelloLinguistico;
    }
}
