package com.tesi.farm.models.richiesta;

import javax.persistence.Column;
import javax.persistence.Id;
import java.sql.Date;

public class RichiestaCompleta {

    private int id;


    private String titolo;


    private String descrizione;


    private Date dataInizio;


    private Date dataFine;


    private Double compenso;


    private int numeroPosizioniRichieste;


    private String note;


    private String vitto;


    private String alloggio;


    private String trasporto;


    private Date createdat;


    private Date updatedat;


    private Date deletedat;


    private String comune;

    private int comuneid;

    private String provincia;

    private String sigla_automobilistica;

    private int tipoContrattoId;

    private int lavoratoriaccettati;

    public int getLavoratoriaccettati() {
        return lavoratoriaccettati;
    }

    public void setLavoratoriaccettati(int lavoratoriaccettati) {
        this.lavoratoriaccettati = lavoratoriaccettati;
    }

    public int getTipoContrattoId() {
        return tipoContrattoId;
    }

    public void setTipoContrattoId(int tipoContrattoId) {
        this.tipoContrattoId = tipoContrattoId;
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

    private int aziendaid;

    public int getComuneid() {
        return comuneid;
    }

    public void setComuneid(int comuneid) {
        this.comuneid = comuneid;
    }

    private String aziendaRagioneSociale;


    private int agenziaid;

    private String agenziaRagioneSociale;

    private String statoiter;


    private String tipocontratto;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public String getAziendaRagioneSociale() {
        return aziendaRagioneSociale;
    }

    public void setAziendaRagioneSociale(String aziendaRagioneSociale) {
        this.aziendaRagioneSociale = aziendaRagioneSociale;
    }

    public String getAgenziaRagioneSociale() {
        return agenziaRagioneSociale;
    }

    public void setAgenziaRagioneSociale(String agenziaRagioneSociale) {
        this.agenziaRagioneSociale = agenziaRagioneSociale;
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

    public String getComune() {
        return comune;
    }

    public void setComune(String comune) {
        this.comune = comune;
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

    public String getStatoiter() {
        return statoiter;
    }

    public void setStatoiter(String statoiter) {
        this.statoiter = statoiter;
    }

    public String getTipocontratto() {
        return tipocontratto;
    }

    public void setTipocontratto(String tipocontratto) {
        this.tipocontratto = tipocontratto;
    }
}
