import datenbankObjekt from "../database.js"

import logging from "logging";

const logger = logging.default("user-service");



function getAlle() {

    const ergebnisArray = datenbankObjekt.userGetAlle();

    logger.info("Anzahl Nutzers ausgelesen: " + ergebnisArray.length);

    return ergebnisArray;
}

function getUserById(id) {

    const alleArray = datenbankObjekt.userGetAlle();

    const filterFkt = (userid) => userid === id;

    const ergebnisArray = alleArray.filter(filterFkt);

    if (ergebnisArray.length === 0) {

        logger.warn(`Kein User mit der ID: ${id} gefunden.`);
        return null;
    }
    else {
        logger.info(`User mit der ID: ${id} gefunden`);
        return ergebnisArray[0];
    }
}

async function neu(userObject) {
    const allUserArray = datenbankObjekt.userGetAlle();

    const filterFkt = (uemail) => uemail.email === userObject.email;

    const ergebnisArray = allUserArray.filter(filterFkt);

    if (ergebnisArray.length > 0) {
        logger.warn(`User mit dem angegebenen Email: ${userObject.email} bereits vorhanden.`)
        return false;
    }

    await datenbankObjekt.userNeu(userObject);

    logger.info(`Neuer User angelegt: ${userObject.userid} -
                                       ${userObject.name} - 
                                       ${userObject.email}`);
    return true;

}

async function userAendern(userid, deltaObject) {

    const userGefunden = getUserById(userid);

    if (userGefunden === false) {

        logger.warn(`Ändern fehlgeschlagen, kein User mit UserID ${userid} gefunden.`);
        return false;
    }

    //Doppelte Emails verhindern
    if (deltaObject.email) {
        const allUserArray = datenbankObjekt.userGetAlle();

        const filterFkt = (uemail) => uemail.email === userObject.email;
        const ergebnisArray = allUserArray.filter(filterFkt);

        if (ergebnisArray.length > 0) {
            logger.warn(`angegebenen Email: ${deltaObject.email} ist bereits vorhanden.`)
            return false;
        }

    }

    const ergebnisObject = await datenbankObjekt.userAendern(userid, deltaObject);

    if (ergebnisObject === null) {

        logger.warn(`Ändern fehlgeschlagen, kein User mit UserID ${userid} gefunden.`);
        return false;

    } else {

        return true;
    }
}

let currentId = 10000;

function generateNewId() {
    currentId++;
    return currentId;
}

export default {
    getAlle, getUserById, neu, userAendern, generateNewId
}