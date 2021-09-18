package com.tesi.farm.models.azienda;

import java.sql.Date;

public class AziendaCompleta {

    private int id;

    private String ragionesociale;

    private String partitaiva;

    private String indirizzo;

    private int comuneid;

    private String cap;

    private String telefono;

    private String email;

    private String urlsito;

    private int settoreattivitaid;

    private Date approved;

    private Date createdat;

    private Date updatedat;

    private Date deletedat;

    private String username;

    private int agenziaid;

    private String comune;

    private String provincia;

    private String settoreattivita;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getRagionesociale() {
        return ragionesociale;
    }

    public void setRagionesociale(String ragionesociale) {
        this.ragionesociale = ragionesociale;
    }

    public String getPartitaiva() {
        return partitaiva;
    }

    public void setPartitaiva(String partitaiva) {
        this.partitaiva = partitaiva;
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

    public String getCap() {
        return cap;
    }

    public void setCap(String cap) {
        this.cap = cap;
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

    public String getUrlsito() {
        return urlsito;
    }

    public void setUrlsito(String urlsito) {
        this.urlsito = urlsito;
    }

    public int getSettoreattivitaid() {
        return settoreattivitaid;
    }

    public void setSettoreattivitaid(int settoreattivitaid) {
        this.settoreattivitaid = settoreattivitaid;
    }

    public Date getApproved() {
        return approved;
    }

    public void setApproved(Date approved) {
        this.approved = approved;
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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getAgenziaid() {
        return agenziaid;
    }

    public void setAgenziaid(int agenziaid) {
        this.agenziaid = agenziaid;
    }

    public String getComune() {
        return comune;
    }

    public void setComune(String comune) {
        this.comune = comune;
    }

    public String getProvincia() {
        return provincia;
    }

    public void setProvincia(String provincia) {
        this.provincia = provincia;
    }

    public String getSettoreattivita() {
        return settoreattivita;
    }

    public void setSettoreattivita(String settoreattivita) {
        this.settoreattivita = settoreattivita;
    }
}
