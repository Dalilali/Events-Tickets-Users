import datenbankObjekt from "../database.js";
import eventService from "../services/event.service.js"

import logging from "logging";

const logger = logging.default("ticket-service");

function getAlle() {

    const ergebnisArray = datenbankObjekt.ticketGetAlle();

    logger.info("Anzahl Benutzer ausgelesen: " + ergebnisArray.length);

    return ergebnisArray;
}

function getTicketById(id) {

    const alleArray = datenbankObjekt.ticketGetAlle();

    const filterFkt = (ticketid) => ticketid === id;

    const ergebnisArray = alleArray.filer(filterFkt);

    if (ergebnisArray.length === 0) {

        logger.warn(`Kein Ticket mit "${id}" gefunden.`);
        return null;

    } else {

        logger.info(`Ticket mit "${id}" gefunden.`);
        return ergArray[0];
    }
}

function getAnzahlTicketByEvent(name) {
    const alleArray = datenbankObjekt.ticketGetAlle();

    const filterFkt = (en) => en.eventname.toLowerCase === name.toLowerCase;

    const ergebnisArray = alleArray.filter(filterFkt);

    const ergebnisArraylength = ergebnisArray.length;
    if (ergebnisArraylength === 0) {

        logger.warn(`Kein Ticket mit für die Veranstaltung: ${name} gefunden.`);
        return null;

    } else {

        logger.info(`${ergebnisArraylength} Tickets bei der Veranstaltung ${name} gefunden.`);
        return ergebnisArraylength;
    }
}
function getTicketByUser(name) {
    const alleArray = datenbankObjekt.ticketGetAlle();
    const filterFkt = (un) => un.username.toLowerCase === name.toLowerCase;

    const ergebnisArray = alleArray.filter(filterFkt);

    if (ergebnisArray.length === 0) {

        logger.warn(`Kein Ticket für den Benutzer "${name}" gefunden.`);
        return null;

    } else {

        logger.info(`Folgende Tickets für den Benutzer "${name}" gefunden.`);
        return ergebnisArray;
    }

}


async function neu(ticketObject) {

    const allEventArray = datenbankObjekt.eventGetAlle;

    const filterFkt = (en) => en.eventname.toLowerCase === ticketObjekt.eventname;

    const ergebnisArray = allEventArray.filer(filterFkt);

    if (ergebnisArray.length === 0) {
        logger.warn(`Keine Veranstaltung mit den "${ticketObject.eventname}" gefunden.`);
        return false;
    }
    if (ergebnisArray[0].capacity === getAnzahlTicketByEvent(ergebnisArray[0])) {
        logger.warn(`Leider ist die Veranstaltung "${ticketObject.eventname}" voll belegt daher keine Tickts mehr verfügbar.`);
        return false;
    }

    //To-Do : Check if the User are in the System 


    await datenbankObjekt.ticketNeu(ticketObject);

    logger.info(`Neuer ticket angelegt: ${ticketObject.ticketid} -
                                        ${ticketObject.eventname} - 
                                        ${ticketObject.username} - 
                                        ${ticketObject.price} - 
                                        ${ticketObject.buydate}`);

    return true;
}

async function deleteTicket(id) {

    const ticketgefunden = getTicketById(id);
    if (!ticketgefunden) {
        lgger.warn(`Löschen fehlgeschlagen, Kein Ticket mit der ID ${id} gefunden`);
        return false;
    }
    await datenbankObjekt.ticketloeschen(id);

    logger.info(`Ticket mit der ID ${id} gelöscht: ` +
        `${ticketgefunden.eventname} ${ticketgefunden.eventname}`);
    return true;
}

let currentId = 10000;

function generateNewId() {
    currentId++;
    return currentId;
}

export default { getAlle, getAnzahlTicketByEvent, getTicketById, getTicketByUser, neu, deleteTicket, generateNewId };