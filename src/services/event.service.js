// Diese Datei enthält die Business-Logik für den Entitätstyp "Studiengang" (sg).

import logging         from "logging";
import datenbankObjekt from "../database.js";


const logger = logging.default("event-service");


/**
 * Alle Events zurückgeben.
 *
 * @returns Array mit eventsobjekten; kann leer sein,
 *          aber nicht `null` oder `undefined`.
 */
function getAlle() {

    const ergebnisArray = datenbankObjekt.eventGetAlle();

    logger.info("Anzahl Veranstaltungen ausgelesen: " + ergebnisArray.length);

    return ergebnisArray;
}

function getByName(name) {

    const nameLoweCase = name.toLowerCase();

    const alleArray = db.getAlle();

    const filterFkt = (user) => user.name.toLowerCase === nameLoweCase;

    const ergebnisArray = alleArray.filer(filterFkt);

    if (ergebnisArray.length === 0) {

        logger.warn(`Kein User mit "${name}" gefunden.`);
        return null;

    } else {

        logger.info(`Name mit "${name}" gefunden.`);
        return ergArray[0];
    }
}




/**
 * Neuen ver anlegen.
 *
 * @param {*} eventObjekt Objekt mit `kurz` und `lang` als Attribute
 *
 * @returns `true`, wenn der Studiengang neu angelegt wurde, sonst `false`
 *          (weil es schon einen Studiengang mit dem gleichen Kurznamen gibt).
 */
async function neu(eventObjekt) {

    // Überprüfen, ob es schon einen Studiengang mit dem gleichen Kurznamen gibt.

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


/**
 * Alle Funktionen als Objekt exportieren.
 */
export default { getAlle, suche, getByName, neu };
