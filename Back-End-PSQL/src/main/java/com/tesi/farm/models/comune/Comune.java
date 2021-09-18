package com.tesi.farm.models.comune;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Objects;

@Entity(name = "comune")
public class Comune {

    @Id
    @Column(name ="Codice_Comune_formato_numerico")
    private int codice_comune_formato_numerico;

    @Column(name = "Codice_Ripartizione_Geografica")
    private int codice_ripartizione_geografica;

    @Column(name ="Ripartizione_geografica")
    private String ripartizione_geografica;

    @Column(name ="Codice_Regione")
    private int codice_regione;

    @Column(name ="Denominazione_Regione")
    private String denominazione_regione;

    @Column(name ="Provincia")
    private String provincia;

    @Column(name ="Sigla_automobilistica")
    private String sigla_automobilistica;

    @Column(name = "Denominazione_Italiana_e_straniera")
    private String denominazione_italiana_e_straniera;


    //getter and setter
    public int getCodice_comune_formato_numerico() {
        return codice_comune_formato_numerico;
    }

    public void setCodice_comune_formato_numerico(int codice_comune_formato_numerico) {
        this.codice_comune_formato_numerico = codice_comune_formato_numerico;
    }

    public int getCodice_ripartizione_geografica() {
        return codice_ripartizione_geografica;
    }

    public void setCodice_ripartizione_geografica(int codice_ripartizione_geografica) {
        this.codice_ripartizione_geografica = codice_ripartizione_geografica;
    }

    public String getRipartizione_geografica() {
        return ripartizione_geografica;
    }

    public void setRipartizione_geografica(String ripartizione_geografica) {
        this.ripartizione_geografica = ripartizione_geografica;
    }

    public int getCodice_regione() {
        return codice_regione;
    }

    public void setCodice_regione(int codice_regione) {
        this.codice_regione = codice_regione;
    }

    public String getDenominazione_regione() {
        return denominazione_regione;
    }

    public void setDenominazione_regione(String denominazione_regione) {
        this.denominazione_regione = denominazione_regione;
    }

    public String getProvincia() {
        return provincia;
    }

    public void setProvincia(String provincia) {
        this.provincia = provincia;
    }

    public String getSigla_automobilistica() {
        return sigla_automobilistica;
    }

    public void setSigla_automobilistica(String sigla_automobilistica) {
        this.sigla_automobilistica = sigla_automobilistica;
    }

    public String getDenominazione_italiana_e_straniera() {
        return denominazione_italiana_e_straniera;
    }

    public void setDenominazione_italiana_e_straniera(String denominazione_italiana_e_straniera) {
        this.denominazione_italiana_e_straniera = denominazione_italiana_e_straniera;
    }

    //equals and hashcode

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Comune comune = (Comune) o;
        return codice_comune_formato_numerico == comune.codice_comune_formato_numerico &&
                codice_ripartizione_geografica == comune.codice_ripartizione_geografica &&
                codice_regione == comune.codice_regione &&
                ripartizione_geografica.equals(comune.ripartizione_geografica) &&
                denominazione_regione.equals(comune.denominazione_regione) &&
                provincia.equals(comune.provincia) &&
                sigla_automobilistica.equals(comune.sigla_automobilistica) &&
                denominazione_italiana_e_straniera.equals(comune.denominazione_italiana_e_straniera);
    }

    @Override
    public int hashCode() {
        return Objects.hash(codice_comune_formato_numerico, codice_ripartizione_geografica, ripartizione_geografica, codice_regione, denominazione_regione, provincia, sigla_automobilistica, denominazione_italiana_e_straniera);
    }
}
