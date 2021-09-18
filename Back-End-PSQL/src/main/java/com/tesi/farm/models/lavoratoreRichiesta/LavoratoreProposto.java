package com.tesi.farm.models.lavoratoreRichiesta;

import java.sql.Date;

public class LavoratoreProposto {
    private int id;

    private String nome;

    private String cognome;

    private String sesso;

    private Date datadinascita;

    private String nazionalita;

    private String telefono;

    private String email;

    private int statoid;

    private String statusgiuridico;

    public String getStatusgiuridico() {
        return statusgiuridico;
    }

    public void setStatusgiuridico(String statusgiuridico) {
        this.statusgiuridico = statusgiuridico;
    }

    public int getStatoid() {
        return statoid;
    }

    public void setStatoid(int statoid) {
        this.statoid = statoid;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCognome() {
        return cognome;
    }

    public void setCognome(String cognome) {
        this.cognome = cognome;
    }

    public String getSesso() {
        return sesso;
    }

    public void setSesso(String sesso) {
        this.sesso = sesso;
    }

    public Date getDatadinascita() {
        return datadinascita;
    }

    public void setDatadinascita(Date datadinascita) {
        this.datadinascita = datadinascita;
    }

    public String getNazionalita() {
        return nazionalita;
    }

    public void setNazionalita(String nazionalita) {
        this.nazionalita = nazionalita;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
