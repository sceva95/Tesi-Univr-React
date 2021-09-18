package com.tesi.farm.models.lavoratore;

import java.sql.Date;

public class LavoratoreCompletoAgenzia {

    private int id;

    private String nome;

    private String cognome;

    private String sesso;

    private Date datadinascita;

    private String statusgiuridico;

    private String codicefiscale;

    private String indirizzo;

    private String cap;

    private String comune;

    private String siglaautomobilistica;

    private String telefono;

    private String email;

    private Date createdat;

    private Date updatedat;

    private Date deletedat;

    private String nazionalita;

    private int statoid;

    private Date dataaggiornamento;

    private int richiesta;

    private Date datainizio;

    private  Date datafine;

    public Date getDatainizio() {
        return datainizio;
    }

    public void setDatainizio(Date datainizio) {
        this.datainizio = datainizio;
    }

    public Date getDatafine() {
        return datafine;
    }

    public void setDatafine(Date datafine) {
        this.datafine = datafine;
    }

    public int getRichiesta() {
        return richiesta;
    }

    public void setRichiesta(int richiesta) {
        this.richiesta = richiesta;
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

    public String getStatusgiuridico() {
        return statusgiuridico;
    }

    public void setStatusgiuridico(String statusgiuridico) {
        this.statusgiuridico = statusgiuridico;
    }

    public String getCodicefiscale() {
        return codicefiscale;
    }

    public void setCodicefiscale(String codicefiscale) {
        this.codicefiscale = codicefiscale;
    }

    public String getIndirizzo() {
        return indirizzo;
    }

    public void setIndirizzo(String indirizzo) {
        this.indirizzo = indirizzo;
    }

    public String getCap() {
        return cap;
    }

    public void setCap(String cap) {
        this.cap = cap;
    }

    public String getComune() {
        return comune;
    }

    public void setComune(String comune) {
        this.comune = comune;
    }

    public String getSiglaautomobilistica() {
        return siglaautomobilistica;
    }

    public void setSiglaautomobilistica(String siglaautomobilistica) {
        this.siglaautomobilistica = siglaautomobilistica;
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

    public Date getCreatedat() {
        return createdat;
    }

    public void setCreatedat(Date createdat) {
        this.createdat = createdat;
    }

    public Date getUpdatedat() {
        return updatedat;
    }

    public void setUpdatedat(Date updatedat) {
        this.updatedat = updatedat;
    }

    public Date getDeletedat() {
        return deletedat;
    }

    public void setDeletedat(Date deletedat) {
        this.deletedat = deletedat;
    }

    public String getNazionalita() {
        return nazionalita;
    }

    public void setNazionalita(String nazionalita) {
        this.nazionalita = nazionalita;
    }

    public int getStatoid() {
        return statoid;
    }

    public void setStatoid(int statoid) {
        this.statoid = statoid;
    }

    public Date getDataaggiornamento() {
        return dataaggiornamento;
    }

    public void setDataaggiornamento(Date dataaggiornamento) {
        this.dataaggiornamento = dataaggiornamento;
    }
}
