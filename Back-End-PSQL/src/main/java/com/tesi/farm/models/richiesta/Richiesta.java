package com.tesi.farm.models.richiesta;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.sql.Date;
import java.util.Objects;

@Entity(name = "Richiesta")
public class Richiesta {

    @Id
    @Column(name = "ID")
    private int id;

    @Column(name = "titolo")
    private String titolo;

    @Column(name = "descrizione")
    private String descrizione;

    @Column(name = "datainizio")
    private Date dataInizio;

    @Column(name = "datafine")
    private Date dataFine;

    @Column(name = "compenso", columnDefinition = "NUMERIC(10,2)")
    private Double compenso;


    @Column(name = "numeroposizionirichieste")
    private int numeroPosizioniRichieste;

    @Column(name = "note")
    private String note;

    @Column(name = "offrevitto", columnDefinition = "vittoalloggiotrasporto")
    private String vitto;

    @Column(name = "offrealloggio", columnDefinition = "vittoalloggiotrasporto")
    private String alloggio;

    @Column(name = "offretrasporto", columnDefinition = "vittoalloggiotrasporto")
    private String trasporto;

    @Column(name = "createdat")
    private Date createdat;

    @Column(name = "updatedat")
    private Date updatedat;

    @Column(name = "deletedat")
    private Date deletedat;

    @Column(name = "comuneid")
    private int comuneid;

    @Column(name = "aziendaid")
    private int aziendaid;

    @Column(name = "agenziaid")
    private int agenziaid;

    @Column(name = "statoiterid")
    private int statoiterid;

    @Column(name="tipocontrattoid")
    private int tipocontrattoid;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getTipocontrattoid() {
        return tipocontrattoid;
    }

    public void setTipocontrattoid(int tipocontrattoid) {
        this.tipocontrattoid = tipocontrattoid;
    }

    public String getTitolo() {
        return titolo;
    }

    public void setTitolo(String titolo) {
        this.titolo = titolo;
    }

    public String getDescrizione() {
        return descrizione;
    }

    public void setDescrizione(String descrizione) {
        this.descrizione = descrizione;
    }

    public Date getDataInizio() {
        return dataInizio;
    }

    public void setDataInizio(Date dataInizio) {
        this.dataInizio = dataInizio;
    }

    public Date getDataFine() {
        return dataFine;
    }

    public void setDataFine(Date dataFine) {
        this.dataFine = dataFine;
    }

    public Double getCompenso() {
        return compenso;
    }

    public void setCompenso(Double compenso) {
        this.compenso = compenso;
    }

    public int getNumeroPosizioniRichieste() {
        return numeroPosizioniRichieste;
    }

    public void setNumeroPosizioniRichieste(int numeroPosizioniRichieste) {
        this.numeroPosizioniRichieste = numeroPosizioniRichieste;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getVitto() {
        return vitto;
    }

    public void setVitto(String vitto) {
        this.vitto = vitto;
    }

    public String getAlloggio() {
        return alloggio;
    }

    public void setAlloggio(String alloggio) {
        this.alloggio = alloggio;
    }

    public String getTrasporto() {
        return trasporto;
    }

    public void setTrasporto(String trasporto) {
        this.trasporto = trasporto;
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

    public int getComuneid() {
        return comuneid;
    }

    public void setComuneid(int comuneid) {
        this.comuneid = comuneid;
    }

    public int getAziendaid() {
        return aziendaid;
    }

    public void setAziendaid(int aziendaid) {
        this.aziendaid = aziendaid;
    }

    public int getAgenziaid() {
        return agenziaid;
    }

    public void setAgenziaid(int agenziaid) {
        this.agenziaid = agenziaid;
    }

    public int getStatoiterid() {
        return statoiterid;
    }

    public void setStatoiterid(int statoiterid) {
        this.statoiterid = statoiterid;
    }
//getter and setter


    @Override
    public String toString() {
        return "Richiesta{" +
                "id=" + id +
                ", titolo='" + titolo + '\'' +
                ", descrizione='" + descrizione + '\'' +
                ", dataInizio=" + dataInizio +
                ", dataFine=" + dataFine +
                ", compenso=" + compenso +
                ", numeroPosizioniRichieste=" + numeroPosizioniRichieste +
                ", note='" + note + '\'' +
                ", vitto='" + vitto + '\'' +
                ", alloggio='" + alloggio + '\'' +
                ", trasporto='" + trasporto + '\'' +
                ", createdat=" + createdat +
                ", updatedat=" + updatedat +
                ", deletedat=" + deletedat +
                ", comuneid=" + comuneid +
                ", aziendaid=" + aziendaid +
                ", agenziaid=" + agenziaid +
                ", statoiterid=" + statoiterid +
                ", tipocontrattoid=" + tipocontrattoid +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Richiesta richiesta = (Richiesta) o;
        return id == richiesta.id && numeroPosizioniRichieste == richiesta.numeroPosizioniRichieste && comuneid == richiesta.comuneid && aziendaid == richiesta.aziendaid && agenziaid == richiesta.agenziaid && statoiterid == richiesta.statoiterid && titolo.equals(richiesta.titolo) && descrizione.equals(richiesta.descrizione) && dataInizio.equals(richiesta.dataInizio) && dataFine.equals(richiesta.dataFine) && Objects.equals(compenso, richiesta.compenso) && Objects.equals(note, richiesta.note) && Objects.equals(vitto, richiesta.vitto) && Objects.equals(alloggio, richiesta.alloggio) && Objects.equals(trasporto, richiesta.trasporto) && Objects.equals(createdat, richiesta.createdat) && Objects.equals(updatedat, richiesta.updatedat) && Objects.equals(deletedat, richiesta.deletedat);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, titolo, descrizione, dataInizio, dataFine, compenso, numeroPosizioniRichieste, note, vitto, alloggio, trasporto, createdat, updatedat, deletedat, comuneid, aziendaid, agenziaid, statoiterid);
    }
}