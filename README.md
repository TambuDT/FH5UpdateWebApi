Forza Horizon 5 Update Checker
==============================

Panoramica
----------

Questo script Node.js fornisce un server HTTP tramite Express per verificare gli aggiornamenti del gioco Forza Horizon 5. Utilizza Puppeteer per estrarre dati da pagine web specifiche e restituisce il collegamento Magnet se è disponibile un aggiornamento.

Dipendenze
----------

-   Express: Un framework di applicazione web per Node.js.
-   Puppeteer: Una libreria Node che fornisce un'API di alto livello per controllare browser headless.

Installazione
-------------

1.  Clona il Repository:

    `git clone https://github.com/tuo-nome-utente/forza-horizon-5-update-checker.git
    cd forza-horizon-5-update-checker`

2.  Installazione delle Dipendenze:

    `npm install`

3.  Avvio del Server:

    `node server.js`

Utilizzo
--------

Effettua una richiesta HTTP GET a `http://localhost:3000/checkupdate` con i parametri di query `last_div` e `current_game_version` per verificare gli aggiornamenti.

Esempio:

`curl http://localhost:3000/checkupdate?last_div=93&current_game_version=v1.0.0.0`

Risposta
--------

-   Se è disponibile un aggiornamento, il server risponde con un JSON contenente il collegamento Magnet.
-   Se non ci sono aggiornamenti, il server risponde con un JSON indicando che non ci sono aggiornamenti.

Configurazione
--------------

-   `release_version_link`: URL della pagina web contenente l'elenco degli aggiornamenti di Forza Horizon 5.
-   `update_url`: URL di base per verificare gli aggiornamenti su TeamKong.