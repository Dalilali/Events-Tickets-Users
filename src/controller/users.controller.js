import { API_PREFIX, CUSTOM_HEADER_FEHLER, HTTP_STATUS_CODES } from "./konstanten.js";
import userService from "../services/user.service.js";
import logging from "logging";

const logger = logging.default("user-controller");


export default function registerRoutes(app) {

    const entityTyp = "user";

    const prefixFuerRouten = `${API_PREFIX}/${entityTyp}`;

    const routeRessource = `${prefixFuerRouten}/:id`;
    const routeCollection = `${prefixFuerRouten}/`;

    app.get(routeRessource, getResource);
    app.get(routeCollection, getCollection);

    app.post(routeCollection, postResource);
    app.patch(routeRessource, patchResource);

}

function getResource(req, res) {
    const id = req.params.id;

    const ergebnisObject = userService.getUserById(id);

    if (ergebnisObject.length === 0) {

        res.status(404);
        res.json([]);

    } else {

        res.status(200);
        res.json(ergebnisObject);
    }
}

function getCollection(req, res) {

    const ergebnisObject = userService.getAlle();

    if (ergebnisObject.length === 0) {

        res.status(404);
        res.json([]);

    } else {

        res.status(200);
        res.json(ergebnisObject);
    }
}

async function postResource(req, res) {

    const userid = userService.generateNewId();
    const name = req.body.name;
    const email = req.body.name;

    if (name === undefined || name.trim() === "") {
        res.setHeader(CUSTOM_HEADER_FEHLER, "Attribut 'name' fehlt oder ist leer.")
        res.status(HTTP_STATUS_CODES.BAD_REQUEST_400);
        res.json({});
        return;
    }
    if (name === undefined || name.trim() === "") {
        res.setHeader(CUSTOM_HEADER_FEHLER, "Attribut 'email' fehlt oder ist leer.")
        res.status(HTTP_STATUS_CODES.BAD_REQUEST_400);
        res.json({});
        return;
    }

    const neuObject = {
        userid: userid.trim(),
        name: name.trim(),
        email: email.trim()
    }

    const erfolgreich = await userService.neu(neuObject);

    if (erfolgreich) {

        res.status(HTTP_STATUS_CODES.CREATED_201);
        res.json(neuObject);

    } else {

        res.setHeader(CUSTOM_HEADER_FEHLER, "User mit diese Angaben kann nicht durchgeführt werden.");
        res.status(HTTP_STATUS_CODES.CONFLICT_409);
        res.json({});
    }
}

async function patchResource(req, res) {
    const useridStr = req.params.id;

    // versuche, die matrikelnummer zu parsen
    let useridInt = parseInt(useridStr);

    if (isNaN(useridInt)) {

        logger.error(`Pfadparameterwert "${useridStr}" konnte nicht nach Int geparst werden.`);
        res.setHeader(CUSTOM_HEADER_FEHLER, "User-ID muss eine ganze Zahl (Integer) sein.");
        res.status(HTTP_STATUS_CODES.BAD_REQUEST_400);
        res.json({});
        return;
    }

    const name = req.body.name;
    const email = req.body.email;

    const deltaObject = {};

    let einAttributGeaendert = false;
    if (name && name.trim().length > 0) {

        einAttributGeaendert = true;
        deltaObject.name = name.trim();
    }
    if (email && email.trim().length > 0) {

        einAttributGeaendert = true;
        deltaObject.email = email.trim();
    }
    if (einAttributGeaendert === false) {

        res.setHeader(CUSTOM_HEADER_FEHLER,
                      "Es muss mindestens ein Attribut mit neuem Wert im JSON-Body enthalten sein.");
        res.status(HTTP_STATUS_CODES.BAD_REQUEST_400);
        res.json( {} );
        return;
    }

    const erfolgreich = await userService.userAendern(useridInt, deltaObject);

    if (erfolgreich) {

        res.status(HTTP_STATUS_CODES.OK_200);
        res.json(deltaObject);
        return;

    } else {

        res.status(HTTP_STATUS_CODES.NOT_FOUND_404);
        res.setHeader(CUSTOM_HEADER_FEHLER, "Ändern fehlgeschlagen");
        res.json({});

    }

}