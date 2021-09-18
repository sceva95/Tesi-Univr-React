package com.tesi.farm.models.azienda;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.sql.Date;
import java.util.Objects;

@Entity(name ="Azienda")
public class Azienda {

    @Id
    @Column(name ="ID")
    private int id;

    @Column(name="ragionesociale", nullable = false)
    private String ragioneSociale;

    @Column(name="partitaiva")
    private String partitaiva;

    @Column(name ="indirizzo", nullable = false)
    private String indirizzo;

    //reference a id Comune
    @Column(name ="comuneID")
    private int comuneId;

    @Column(name ="CAP", nullable = false)
    private String cap;

    @Column(name ="telefono")
    private String telefono;

    @Column(name ="email")
    private String email;

    @Column(name ="URLsito")
    private String urlsito;

    @Column(name ="settoreattivitaid")
    private int settoreAttivitaId;

    @Column(name="approved")
    private Date approved;

    @Column(name="createdat")
    private Date createdat;

    @Column(name ="updatedat")
    private Date updatedat;

    @Column(name ="deletedat")
    private Date deletedat;

    @Column(name ="username", nullable = false)
    private String username;

    @Column(name ="PASSWORD", nullable = false)
    private String password;

    @Column(name ="agenziaid")
    private int agenziaid;

    //getter and setter

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getRagioneSociale() {
        return ragioneSociale;
    }

    public void setRagioneSociale(String ragioneSociale) {
        this.ragioneSociale = ragioneSociale;
    }

    public String getIndirizzo() {
        return indirizzo;
    }

    public void setIndirizzo(String indirizzo) {
        this.indirizzo = indirizzo;
    }

    public int getComuneId() {
        return comuneId;
    }

    public void setComuneId(int comuneId) {
        this.comuneId = comuneId;
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

    public int getSettoreAttivitaId() {
        return settoreAttivitaId;
    }

    public void setSettoreAttivitaId(int settoreAttivitaId) {
        this.settoreAttivitaId = settoreAttivitaId;
    }


    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPartitaiva() {
        return partitaiva;
    }

    public void setPartitaiva(String partitaiva) {
        this.partitaiva = partitaiva;
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
        Azienda azienda = (Azienda) o;
        return id == azienda.id &&
                comuneId == azienda.comuneId &&
                settoreAttivitaId == azienda.settoreAttivitaId &&
                ragioneSociale.equals(azienda.ragioneSociale) &&
                indirizzo.equals(azienda.indirizzo) &&
                cap.equals(azienda.cap) &&
                Objects.equals(telefono, azienda.telefono) &&
                Objects.equals(email, azienda.email) &&
                Objects.equals(urlsito, azienda.urlsito) &&
                username.equals(azienda.username) &&
                password.equals(azienda.password);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, ragioneSociale, indirizzo, comuneId, cap, telefono, email, urlsito, settoreAttivitaId, username, password);
    }

    @Override
    public String toString() {
        return "Azienda{" +
                "id=" + id +
                ", ragioneSociale='" + ragioneSociale + '\'' +
                ", indirizzo='" + indirizzo + '\'' +
                ", comuneId=" + comuneId +
                ", cap='" + cap + '\'' +
                ", telefono='" + telefono + '\'' +
                ", email='" + email + '\'' +
                ", urlsito='" + urlsito + '\'' +
                ", settoreAttivitaId=" + settoreAttivitaId +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                '}';
    }

}
