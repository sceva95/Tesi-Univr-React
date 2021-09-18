package com.tesi.farm.models.agenzia;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.sql.Date;
import java.util.Objects;

@Entity(name="Agenzia")
public class Agenzia {

    @Id
    @Column(name ="ID")
    private int id;

    @Column(name="ragionesociale", nullable = false)
    private String ragioneSociale;

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

    @Column(name ="username", nullable = false)
    private String username;

    @Column(name ="PASSWORD", nullable = false)
    private String password;

    @Column(name="createdat")
    private Date createdat;

    @Column(name="updatedat")
    private Date updatedat;

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

    //hashcode e equals

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Agenzia agenzia = (Agenzia) o;
        return id == agenzia.id &&
                comuneId == agenzia.comuneId &&
                ragioneSociale.equals(agenzia.ragioneSociale) &&
                indirizzo.equals(agenzia.indirizzo) &&
                cap.equals(agenzia.cap) &&
                Objects.equals(telefono, agenzia.telefono) &&
                Objects.equals(email, agenzia.email) &&
                Objects.equals(urlsito, agenzia.urlsito) &&
                username.equals(agenzia.username) &&
                password.equals(agenzia.password);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, ragioneSociale, indirizzo, comuneId, cap, telefono, email, urlsito, username, password);
    }

    @Override
    public String toString() {
        return "Agenzia{" +
                "id=" + id +
                ", ragioneSociale='" + ragioneSociale + '\'' +
                ", indirizzo='" + indirizzo + '\'' +
                ", comuneId=" + comuneId +
                ", cap='" + cap + '\'' +
                ", telefono='" + telefono + '\'' +
                ", email='" + email + '\'' +
                ", urlsito='" + urlsito + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
