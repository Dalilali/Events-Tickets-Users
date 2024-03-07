import express from "express";
import logging from "logging";


import datenbankObjekt  from "./database.js";
import controllerArray  from "./controller/index.js";
import middlewareArray  from "./middleware/allgemein.middlerware.js";

const logger = logging.default("main");

const app = express();


await datenbankObjekt.initialisieren();

// Damit Body von HTTP-POST-Request als JSON interpretiert wird
app.use( express.json() );
app.use( express.static("public") );
app.use( middlewareArray );


let anzahlRestEndpunkte = 0;
for (const controller of controllerArray) {

    anzahlRestEndpunkte += controller(app);
}
logger.info(`Anzahl registrierter REST-Endpunkte: ${anzahlRestEndpunkte}\n`);

// Server starten
const PORT_NUMMER = 8080;
app.listen( PORT_NUMMER,
    () => { logger.info(`Web-Server lauscht auf Port ${PORT_NUMMER}.\n`); }
  );
