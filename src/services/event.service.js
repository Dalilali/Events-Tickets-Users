// Diese Datei enthält die Business-Logik für den Entitätstyp "Studiengang" (sg).

import logging         from "logging";
import datenbankObjekt from "../database.js";


const logger = logging.default("event-service");



function getAlle() {

    const ergebnisArray = datenbankObjekt.eventGetAlle();

    logger.info("Anzahl Veranstaltungen ausgelesen: " + ergebnisArray.length);

    return ergebnisArray;
}

function getByEventname(name) {

    const nameLoweCase = name.toLowerCase();

    const alleArray = datenbankObjekt.eventGetAlle();

    const filterFkt = (en) => en.eventname.toLowerCase === nameLoweCase;

    const ergebnisArray = alleArray.filer(filterFkt);

    if (ergebnisArray.length === 0) {

        logger.warn(`Kein User mit "${name}" gefunden.`);
        return null;

    } else {

        logger.info(`Name mit "${name}" gefunden.`);
        return ergArray[0];
    }
}



async function neu(eventObjekt) {

    const eventname = eventObjekt.eventname;

    const eventObj = getByName(eventname);
    if (eventObj) {

        logger.error(`Veranstaltung mit der Name: "${eventname}" existiert bereits und findet am: ` +
                      eventObj.date + " statt.");
        return false;
    }

    await datenbankObjekt.eventNeu(eventObjekt);

    logger.info(`Neuer Veranstaltung angelegt: ${eventObjekt.name} - ${eventObjekt.date} - ${eventObjekt.location} - ${eventObjekt.capacity}`);

    return true;
}


export default { getAlle, getByEventname, neu };
