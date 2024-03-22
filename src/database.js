import { JSONFilePreset } from "lowdb/node";

import logging from "logging";

const logger = logging.default("datenbank");

const dbDateiName = "db.json";

const defaultData = {
    "users": [
        {
            "userid": 1,
            "name": "max musterman",
            "email": "Max@musterman.de"
        }
    ],

    "events": [
        {
            "eventname": "Rock am Ring",
            "date": "7.6.2024",
            "location": "Nürbergring",
            "capacity": 70000
        },
        {
            "eventname": "Sea You",
            "date": "13.7.2024",
            " location": "Freiburg",
            "capacity": 70000
        }
    ],
    
    "tickets": [
        {
            "ticketid": 5,
            "eventname": "Rock am Ring",
            "username": "Max Musterman",
            "price": 200,
            "buydate": "2.3.2024"
        }
    ]
};

let db = null;

async function initialisieren() {
    
    db = await JSONFilePreset(dbDateiName, defaultData);
    
    await db.write();
    
    logger.info(`Datenbank mit Datei "${dbDateiName}" initialisiert.`);
    logger.info(`Anzahl der Veranstaltungen: ${db.data.events.length}`);
    logger.info(`Anzahl der Anwender : ${db.data.users.length}`);
    logger.info(`Anzahl verkaufte Tickets : ${db.data.tickets.length}`);
}


function eventGetAlle() {
    
    if (db.data && db.data.events) {
        return db.data.events;
    } else {        
        return [];
    }
}

async function eventNeu(eventObjekt) {

    db.data.users.push(eventObjekt);
    await db.write();
}

function ticketGetAlle() {
    
    if (db.data && db.data.tickets) {
        return db.data.tickets;
    } else {
        return [];
    }
}

function userGetAlle() {

    if (db.data && db.data.users) {
        return db.data.users;
    } else {
        return [];
    }
}

async function ticketNeu(ticketObjekt) {

    db.data.events.push(ticketObjekt)
    await db.write();
}

async function ticketloeschen(ticketid) {

    const filterFkt = (ticket) => ticket.ticketid != ticketid;
    db.data.tickets = db.data.studis.filter(filterFkt);
    await db.write();
}

async function userNeu(userObjekt) {

    db.data.users.push(userObjekt)
    await db.write();
}

async function userAendern(user, deltaObjekt) {

    let userObjekt = null;
    for (let i = 0; i < db.data.users.length; i++) {
        if (db.data.users[i].userid === user) {

            userObjekt = db.data.users[i];
            break;
        }

    }
    if (userObjekt === null) {

        logger.error(`INTERNER FEHLER: Kein User mit UserID "${user}" gefunden.`);
        return null;
    }

    if (deltaObjekt.name) {

        userObjekt.name = deltaObjekt.name;
        logger.info(`Name von User ${user} geändert: ${userObjekt.name}`);
    }
    if (deltaObjekt.email) {

        userObjekt.email = deltaObjekt.email;
        logger.info(`Email von User ${user} geändert: ${userObjekt.email}`);
    }

    await db.write();

    return userObjekt;
}





export default {
    db, initialisieren,
    eventGetAlle, eventNeu,
    ticketGetAlle, ticketNeu, ticketloeschen,
    userGetAlle, userNeu, userAendern
};