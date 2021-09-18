package com.tesi.farm.models.stato;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Objects;

@Entity(name ="stato")
public class Stato {

    @Id
    @Column(name ="id_stati")
    private int id_stati;

    @Column(name ="nome_stati")
    private String nome_stati;

    @Column(name ="sigla_numerica_stati")
    private String sigla_numerica_stati;

    @Column(name ="sigla_iso_3166_1_alpha_3_stati")
    private String sigla_iso_3166_1_alpha_3_stati;

    @Column(name ="sigla_iso_3166_1_alpha_2_stati")
    private String sigla_iso_3166_1_alpha_2_stati;

    //getter and setter

    public int getId_stati() {
        return id_stati;
    }

    public void setId_stati(int id_stati) {
        this.id_stati = id_stati;
    }

    public String getNome_stati() {
        return nome_stati;
    }

    public void setNome_stati(String nome_stati) {
        this.nome_stati = nome_stati;
    }

    public String getSigla_numerica_stati() {
        return sigla_numerica_stati;
    }

    public void setSigla_numerica_stati(String sigla_numerica_stati) {
        this.sigla_numerica_stati = sigla_numerica_stati;
    }

    public String getSigla_iso_3166_1_alpha_3_stati() {
        return sigla_iso_3166_1_alpha_3_stati;
    }

    public void setSigla_iso_3166_1_alpha_3_stati(String sigla_iso_3166_1_alpha_3_stati) {
        this.sigla_iso_3166_1_alpha_3_stati = sigla_iso_3166_1_alpha_3_stati;
    }

    public String getSigla_iso_3166_1_alpha_2_stati() {
        return sigla_iso_3166_1_alpha_2_stati;
    }

    public void setSigla_iso_3166_1_alpha_2_stati(String sigla_iso_3166_1_alpha_2_stati) {
        this.sigla_iso_3166_1_alpha_2_stati = sigla_iso_3166_1_alpha_2_stati;
    }

    //equals and hashcode

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Stato stato = (Stato) o;
        return id_stati == stato.id_stati &&
                Objects.equals(nome_stati, stato.nome_stati) &&
                Objects.equals(sigla_numerica_stati, stato.sigla_numerica_stati) &&
                Objects.equals(sigla_iso_3166_1_alpha_3_stati, stato.sigla_iso_3166_1_alpha_3_stati) &&
                Objects.equals(sigla_iso_3166_1_alpha_2_stati, stato.sigla_iso_3166_1_alpha_2_stati);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id_stati, nome_stati, sigla_numerica_stati, sigla_iso_3166_1_alpha_3_stati, sigla_iso_3166_1_alpha_2_stati);
    }
}
