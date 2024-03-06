import { JSONFilePreset } from "lowdb/node";

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
            "date": "07-06-2024",
            "location": "Nürbergring",
            "capacity": 70000
        },
        {
            "eventname": "Sea You",
            "date": "13-07-2024",
            " location": "Freiburg",
            "capacity": 70000
        }
    ],
    
    "tickets": [
        {
            "ticketid": 5,
            "eventname": "Rock am Ring",
            "Username": "Max Musterman",
            "price": 200,
            "buydate": "02-03-2024"
        }
    ]
};

export const db = null;

async function initialisieren() {

    db = await JSONFilePreset(dbDateiName, anfangsDaten);

    await datenbank.write();

    logger.info(`Datenbank mit Datei "${dbDateiName}" initialisiert.`);
    logger.info(`Anzahl der Veranstaltungen: ${db.data.events.length}`);
    logger.info(`Anzahl der Anwender : ${db.data.users.length}`);
} logger.info(`Anzahl verkaufte Tickets : ${db.data.tickets.length}`);

function eventGetAlle() {

    if (db.data && db.data.events) {

        return datenbank.data.events;

    } else {

        return [];
    }
}

function ticketGetAlle() {

    if (db.data && db.data.tickets) {

        return datenbank.data.tickets;

    } else {

        return [];
    }
}

function userGetAlle() {

    if (db.data && db.data.users) {

        return datenbank.data.users;

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
        if (datenbank.data.studis[i].matrikelnr === matrikelnr) {

            userObjekt = datenbank.data.users[i];
            break;
        }

    }
    if (userObjekt === null) {

        logger.error(`INTERNER FEHLER: Kein Studi mit Matrikelnr "${matrikelnr}" gefunden.`);
        return null;
    }

    if (deltaObjekt.name) {

        userObjekt.name = deltaObjekt.name;
        logger.info(`Name von User ${user} geändert: ${userObjekt.name}`);
    }
    if (deltaObjekt.email) {

        userObjekt.email = deltaObjekt.email;
        logger.info(`Email von User ${name} geändert: ${userObjekt.nachname}`);
    }

    await datenbank.write();

    return userObjekt;
}

async function eventNeu(eventObjekt) {
    db.data.users.push(eventObjekt);
    await db.write();
}




export default {
    db, initialisieren,
    eventGetAlle, eventNeu,
    ticketGetAlle, ticketNeu, ticketloeschen,
    userGetAlle, userNeu, userAendern
};