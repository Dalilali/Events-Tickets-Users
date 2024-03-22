import { API_PREFIX, CUSTOM_HEADER_FEHLER, HTTP_STATUS_CODES } from "./konstanten.js";
import ticketService from "../services/ticket.service.js";
import logging from "logging";

const logger = logging.default("ticket-controller");


export default function registerRoutes(app) {

    const entityTyp = "ticket";

    const prefixFuerRouten = `${API_PREFIX}/${entityTyp}`;

    const routeRessource = `${prefixFuerRouten}/:id`;
    const routeCollection = `${prefixFuerRouten}/`;

    app.get(routeRessource , getResource);
    
    app.post(routeCollection, postResource);
    
    app.delete(routeRessource, deleteResource);

}

function getResource(req, res) {
    const id = req.parms.id;

    const ergebnisObjekt = ticketService.getTicketById(id);

    if (ergebnisArray.length === 0) {

        res.status(404);
        res.json([]);

    } else {

        res.status(200);
        res.json(ergebnisObjekt);
    }
}

async function postResource (req ,res) {
    const ticketid = ticketService.generateNewId();

    const eventname = req.body.eventname;
    const username = req.body.username;
    const price = req.body.price;

    const buydate = new Date().toLocaleDateString();

    if(eventname === undefined || eventname.trim() === "") {
        res.setHeader(CUSTOM_HEADER_FEHLER, "Attribut 'Eventname' fehlt oder ist leer.");
        res.status(HTTP_STATUS_CODES.BAD_REQUEST_400);
        res.json({});
        return;
    }

    if(username === undefined || eventname.trim() === "") {
        res.setHeader(CUSTOM_HEADER_FEHLER, "Attribut 'Username' fehlt oder ist leer.");
        res.status(HTTP_STATUS_CODES.BAD_REQUEST_400);
        res.json({});
        return;
    }

    if(price === undefined || location.trim() === "") {
        res.setHeader(CUSTOM_HEADER_FEHLER, "Attribut 'Price' fehlt oder ist leer.");
        res.status(HTTP_STATUS_CODES.BAD_REQUEST_400);
        res.json({});
        return;
    }

    const neuObject = {
        ticketid: ticketid.trim(),
        eventname: eventname.trim(),
        username: username.trim(),
        price: price.trim(),
        buydate: buydate.trim()
    }

    const erfolgreich = await ticketService.neu(neuObject);

    if (erfolgreich) {

        res.status( HTTP_STATUS_CODES.CREATED_201 );
        res.json( neuObject );

    } else {

        res.setHeader(CUSTOM_HEADER_FEHLER, "Tickets mit diese Angaben kann nicht durchgeführt werden.");
        res.status( HTTP_STATUS_CODES.CONFLICT_409 );
        res.json( {} );
    }

}

async function deleteResource(req ,res) {
    const ticketid = req.param.id;

    let ticketidInt = parseInt(ticketid);

    if (isNaN(ticketidInt)){
        logger.error(`Pfadparameterwert "${ticketid}" konnte nicht nach Int geparst werden`);
        res.setHeader(CUSTOM_HEADER_FEHLER, "TicketId muss eine ganze Zahl sein!.")
        res.status(HTTP_STATUS_CODES.BAD_REQUEST_400);
        res.json({});
        return;   
    }

    const erfolgreich = await ticketService.deleteTicket(id);

    if (erfolgreich) {

        res.status( HTTP_STATUS_CODES.NO_CONTENT_204 );
        res.json( {} );

    } else {

        res.setHeader(CUSTOM_HEADER_FEHLER,
                      `Löschen fehlgeschlagen, kein Ticket mit dieser ID ${ticketidInt} gefunden.`);
        res.status( HTTP_STATUS_CODES.NOT_FOUND_404 );
        res.json( {} );
    }

}