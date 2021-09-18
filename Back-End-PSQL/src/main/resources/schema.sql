CREATE EXTENSION IF NOT EXISTS pgcrypto; 

CREATE TABLE IF NOT EXISTS stato (
  id_stati SERIAL PRIMARY KEY,
  nome_stati varchar(128) DEFAULT NULL,
  sigla_numerica_stati varchar(4) DEFAULT NULL,
  sigla_iso_3166_1_alpha_3_stati varchar(3) DEFAULT NULL,
  sigla_iso_3166_1_alpha_2_stati varchar(2) DEFAULT NULL
  );
  
  CREATE TABLE IF NOT EXISTS comune(
   Codice_Ripartizione_Geografica       INTEGER  NOT NULL
  ,Ripartizione_geografica              VARCHAR(10) NOT NULL
  ,Codice_Regione                       INTEGER  NOT NULL
  ,Denominazione_Regione                VARCHAR(28) NOT NULL
  ,Provincia                            VARCHAR(28) NOT NULL
  ,Sigla_automobilistica                VARCHAR(2) NOT NULL
  ,Codice_Comune_formato_numerico       INTEGER  NOT NULL PRIMARY KEY 
  ,Denominazione_Italiana_e_straniera   VARCHAR(59) NOT NULL
);


CREATE TABLE IF NOT EXISTS SettoreAttivita (
	ID SERIAL PRIMARY KEY,
	descrizione VARCHAR  --Faunistico / Venatorie; Florovivaistico; Itticoltura; Manutenzione del Verde; Produzioni Casearie; Produzioni Cerealicole; Produzioni Olivicole; Produzioni Ortofrutticole; Produzioni Vitivinicole; Produzioni Zootecniche; Silvicoltura; Altro
);

CREATE TABLE IF NOT EXISTS Agenzia (
	ID SERIAL PRIMARY KEY,
	ragioneSociale VARCHAR NOT NULL,
	indirizzo VARCHAR NOT NULL,
	comuneID int NOT NULL REFERENCES Comune(Codice_Comune_formato_numerico),
	CAP VARCHAR NOT NULL,
	telefono VARCHAR, -- CHECK (numeroTelefono SIMILAR TO '\+?[0 -9]+ '),
	email VARCHAR,
	URLsito VARCHAR,
	createdat DATE,
	updatedat DATE,
	username varchar NOT NULL UNIQUE,
	PASSWORD varchar NOT NULL
);


CREATE TABLE IF NOT EXISTS Azienda (
	ID SERIAL PRIMARY KEY,
	ragionesociale VARCHAR NOT NULL,
	partitaiva VARCHAR NOT NULL,
	indirizzo VARCHAR NOT NULL,
	comuneID int REFERENCES Comune(Codice_Comune_formato_numerico),
	CAP VARCHAR NOT NULL,
	telefono VARCHAR, -- CHECK (numeroTelefono SIMILAR TO '\+?[0 -9]+ '),
	email VARCHAR,
	URLsito VARCHAR,
	settoreAttivitaID int REFERENCES SettoreAttivita(ID),
	approved DATE,
	createdat DATE,
	updatedat DATE,
	deletedat DATE,
	username varchar NOT NULL UNIQUE,
	PASSWORD varchar NOT NULL,
	agenziaid SERIAL REFERENCES Agenzia(id)
);

CREATE TABLE IF NOT EXISTS TipoContratto(
	ID SERIAL PRIMARY KEY,
	descrizione VARCHAR
);

DROP DOMAIN IF EXISTS vittoAlloggioTrasporto;
CREATE DOMAIN vittoAlloggioTrasporto AS VARCHAR
CHECK (VALUE IN('Si', 'No', 'Su richiesta', 'Se disponibile'));

CREATE TABLE IF NOT EXISTS Statoiter(
ID SERIAL PRIMARY KEY,
	descrizione VARCHAR
);




CREATE TABLE  IF NOT EXISTS Richiesta (
	ID SERIAL PRIMARY KEY,
	titolo varchar NOT NULL,
	descrizione VARCHAR NOT NULL,
	datainizio DATE NOT NULL,
	datafine DATE not null,
	compenso NUMERIC(10, 2),
	numeroPosizioniRichieste int,
	note varchar,
	offrevitto vittoAlloggioTrasporto,
	offrealloggio vittoAlloggioTrasporto,
	offretrasporto vittoAlloggioTrasporto,
	createdat date,
	updatedat date,
	deletedat date,
	tipocontrattoid int REFERENCES tipocontratto(ID),
	comuneid int,
	agenziaid int REFERENCES Agenzia(id),
	aziendaID int REFERENCES Azienda(ID),
	statoiterid int references Statoiter(id)
);

CREATE TABLE IF NOT EXISTS Competenza(
	ID int PRIMARY KEY,
	descrizione VARCHAR
); 

CREATE TABLE IF NOT EXISTS RichiestaCompetenza (
	competenzaID int REFERENCES Competenza(ID),
	richiestaID int REFERENCES Richiesta(ID),
	priorita int
);



CREATE TABLE IF NOT EXISTS Lingua(
	ID SERIAL PRIMARY KEY,
	descrizione VARCHAR
); 

DROP DOMAIN IF EXISTS livelloLinguistico;
CREATE DOMAIN livelloLinguistico AS VARCHAR
CHECK (VALUE IN('A1', 'A2', 'B1', 'B2', 'C1', 'C2'));

CREATE TABLE IF NOT EXISTS LinguaRichiesta (
	linguaID int REFERENCES Lingua(ID),
	richiestaID int REFERENCES Richiesta(ID),
	livelloLinguisticoRichiesto livelloLinguistico
);

CREATE TABLE tipoPatente (
	siglaPatente varchar(3) PRIMARY KEY,
	descrizione varchar
);



CREATE TABLE IF NOT EXISTS patenteRichiesta (
	patente VARCHAR(3) REFERENCES tipoPatente(siglaPatente),
	richiestaID int REFERENCES Richiesta(ID)
);

CREATE TABLE IF NOT EXISTS Lavoratore (
	ID SERIAL PRIMARY KEY,
	nome VARCHAR,
	cognome VARCHAR,
	sesso varchar, --serve?
	dataDiNascita date, --serve?
	statusGiuridico varchar, --se serve, da parametrizzare {italiano, straniero con regolare permesso di soggiorno, richiedente protezione internazionale}
	codiceFiscale CHAR(16), 
	indirizzo VARCHAR,
	CAP VARCHAR NOT NULL,
	comuneID int REFERENCES Comune(Codice_Comune_formato_numerico),
	telefono VARCHAR,
	email VARCHAR,
	createdat DATE,
	updatedat DATE,
	deletedat DATE,
	nazionalità int REFERENCES stato(id_stati),
	agenziaid int REFERENCES Agenzia(id)
	
);

CREATE TABLE IF NOT EXISTS LinguaLavoratore (
	linguaID int REFERENCES Lingua(ID),
	lavoratoreID int REFERENCES Lavoratore(ID),
	livelloLinguisticoRichiesto livelloLinguistico
);

CREATE TABLE IF NOT EXISTS patenteLavoratore(
	patente VARCHAR(3) REFERENCES tipoPatente(siglaPatente),
	lavoratoreID int REFERENCES Lavoratore(ID)
);

CREATE TABLE IF NOT EXISTS LavoratoreCompetenza (
	competenzaID int REFERENCES Competenza(ID),
	lavoratoreID int REFERENCES Lavoratore(ID)
);

CREATE TABLE statoLavoratore (
	ID SERIAL PRIMARY KEY,
	descrizione varchar
);



CREATE TABLE IF NOT EXISTS lavoratoreRichiesta(
	lavoratoreID int REFERENCES Lavoratore(ID),
	RichiestaID int REFERENCES Richiesta(ID),
	statoID int REFERENCES statoLavoratore(ID),
	dataAggiornamento date	
);