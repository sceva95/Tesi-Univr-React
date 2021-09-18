# Tesi-Univr-React
Tesi di laurea all'università di verona basata su psql, Spring e React


Installazione: 


# <strong>Database PSQL</strong>

Installare PostgresQL 

Selezionare PostgreSQL Server, pgAdmin4, Command Line Tools 

Selezionare la porta 5432 

Accedere come SuperUser (postgress) 

Creare un nuovo utente con nome: 
<   vr389446  > 
password: 
<   tesi   > 
e permessi da Super User 

Creare un database con nome: 
<   tesi_vr389446   > 
porta: 
<   5432  > 
associato all’utente inserito precedentemente 

Eseguire dalla tab QUERY TOOLS in ordine i file 

Schema.sql 

Data.sql 

Che si possono trovare all’interno della cartella Database


# <strong>BACK-END</strong>

Installare JDK 15.02  


Eseguire il file Back-end-PSQL/target/farm-0.0.1-SNAPSHOT.jar 

L'eseguibile si metterà in ascolto sulla porta 8080


# <strong>Front-end</strong> 

Installare il file Librerie/Node.js 

Aprire il terminale nella cartella Front-end 

Eseguire il comando: 
< npm install > 

Al termine eseguire il comando: 
< npm run start > 
