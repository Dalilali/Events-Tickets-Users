import { API_PREFIX, CUSTOM_HEADER_FEHLER, HTTP_STATUS_CODES } from "./konstanten.js";
import logging from "logging";
import eventService from "../services/event.service.js";

const logger = logging.default("events-controller");


export default function registerRoutes(app) {


    const entityTyp = "event";

    const prefixFuerRouten = `${API_PREFIX}/${entityTyp}`;

    const routeRessource = `${prefixFuerRouten}/:name`;
    const routeCollection = `${prefixFuerRouten}/`;


    app.get(routeCollection, getCollection);
    logger.info(`Route registriert: GET ${routeCollection}`);

    app.get(routeRessource, getResource)
    logger.info(`Route registriert: GET ${routeRessource}`);

    app.post(routeCollection, postCollection);
    logger.info(`Route registriert: POST ${routeCollection}`);
};

function getCollection(req, res) {

    let ergebnisArray = null;

    ergebnisArray = eventService.getAlle();

    if (ergebnisArray.length === 0) {

        res.status(404);
        res.json([]);
    } else {
        res.status(200);
        res.json(ergebnisArray);
    }
}


function getResource(req, res) {
    const name = req.params.name;

    const ergebnisObjekt = eventService.getByEventname(name);

    if (ergebnisArray.length === 0) {

        res.status(404);
        res.json([]);

    } else {

        res.status(200);
        res.json(ergebnisObjekt);
    }
}

async function postCollection(req , res) {
    const eventname = req.body.eventname;
    const date = req.body.date;
    const location = req.bpdy.location;
    const capacity = req.body.capazity;

    if(eventname === undefined || eventname.trim() === "") {
        res.setHeader(CUSTOM_HEADER_FEHLER, "Attribut 'Name' fehlt oder ist leer.");
        res.status(HTTP_STATUS_CODES.BAD_REQUEST_400);
        res.json({});
        return;
    }
    if(date === undefined || date.trim() === "") {
        res.setHeader(CUSTOM_HEADER_FEHLER, "Attribut 'date' fehlt oder ist leer.");
        res.status(HTTP_STATUS_CODES.BAD_REQUEST_400);
        res.json({});
        return;
    }
    if(location === undefined || location.trim() === "") {
        res.setHeader(CUSTOM_HEADER_FEHLER, "Attribut 'location' fehlt oder ist leer.");
        res.status(HTTP_STATUS_CODES.BAD_REQUEST_400);
        res.json({});
        return;
    }
    if(capacity === undefined || capacity.trim() === "") {
        res.setHeader(CUSTOM_HEADER_FEHLER, "Attribut 'capacity' fehlt oder ist leer.");
        res.status(HTTP_STATUS_CODES.BAD_REQUEST_400);
        res.json({});
        return;
    }
    
    const neuObject = {
        eventname: eventname.trim(),
        date: date.trim(),
        location: location.trim(),
        capacity: capacity.trim()
    }

    const erfolgreich = await eventService.neu(neuObject);

    if (erfolgreich) {

        res.status( HTTP_STATUS_CODES.CREATED_201 );
        res.json( neuObject );

    } else {

        res.setHeader(CUSTOM_HEADER_FEHLER, "Veranstaltung mit diese Angaben existieren bereits.");
        res.status( HTTP_STATUS_CODES.CONFLICT_409 );
        res.json( {} );
    }

}