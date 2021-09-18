package com.tesi.farm.models.lavoratore;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.sql.Date;
import java.util.Objects;

@Entity(name ="lavoratore")
public class Lavoratore {

    @Id
    @Column(name ="ID")
    private int id;

    @Column(name ="nome")
    private String nome;

    @Column(name ="cognome")
    private String cognome;

    @Column(name ="sesso")
    private String sesso;

    @Column(name ="datadinascita")
    private Date dataDiNascita;

    @Column(name ="statusgiuridico")
    private String statusGiuridico;

    @Column(name ="codicefiscale", length = 16)
    private String codiceFiscale;

    @Column(name ="indirizzo")
    private String indirizzo;

    @Column(name ="comuneid")
    private int comuneid;

    @Column(name="cap")
    private String cap;


    @Column(name ="nazionalità")
    private int nazionalita;

    @Column(name ="telefono")
    private String telefono;

    @Column(name ="email")
    private String email;

    @Column(name = "createdat")
    private Date createdat;

    @Column(name ="updatedat")
    private Date updatedat;

    @Column(name="deletedat")
    private Date deletedat;

    @Column(name="agenziaid")
    private int agenziaid;
    //getter and setters

    public Date getDeletedat() {
        return deletedat;
    }

    public void setDeletedat(Date deletedat) {
        this.deletedat = deletedat;
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

    public Date getDataDiNascita() {
        return dataDiNascita;
    }

    public void setDataDiNascita(Date dataDiNascita) {
        this.dataDiNascita = dataDiNascita;
    }

    public String getStatusGiuridico() {
        return statusGiuridico;
    }

    public void setStatusGiuridico(String statusGiuridico) {
        this.statusGiuridico = statusGiuridico;
    }

    public String getCodiceFiscale() {
        return codiceFiscale;
    }

    public void setCodiceFiscale(String codiceFiscale) {
        this.codiceFiscale = codiceFiscale;
    }

    public String getIndirizzo() {
        return indirizzo;
    }

    public void setIndirizzo(String indirizzo) {
        this.indirizzo = indirizzo;
    }

    public int getComuneid() {
        return comuneid;
    }

    public void setComuneid(int comuneid) {
        this.comuneid = comuneid;
    }

    public int getNazionalita() {
        return nazionalita;
    }

    public void setNazionalita(int nazionalita) {
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

    public String getCap() {
        return cap;
    }

    public void setCap(String cap) {
        this.cap = cap;
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

    public int getAgenziaid() {
        return agenziaid;
    }

    public void setAgenziaid(int agenziaid) {
        this.agenziaid = agenziaid;
    }

    //equals and hashcode

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Lavoratore that = (Lavoratore) o;
        return id == that.id &&
                comuneid == that.comuneid &&
                nazionalita == that.nazionalita &&
                Objects.equals(nome, that.nome) &&
                Objects.equals(cognome, that.cognome) &&
                Objects.equals(sesso, that.sesso) &&
                Objects.equals(dataDiNascita, that.dataDiNascita) &&
                Objects.equals(statusGiuridico, that.statusGiuridico) &&
                Objects.equals(codiceFiscale, that.codiceFiscale) &&
                Objects.equals(indirizzo, that.indirizzo) &&
                Objects.equals(telefono, that.telefono) &&
                Objects.equals(email, that.email);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, nome, cognome, sesso, dataDiNascita, statusGiuridico, codiceFiscale, indirizzo, comuneid, nazionalita, telefono, email);
    }
}
