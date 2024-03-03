import service from "../services/ticket.service.js";
import {wrapAsync} from "../utils.js";



const prefix = "/api/tickt"


export default function registerRoutes(app){
    app.get('${prefix}/:id', wrapAsync(getTicketByID));
};


async function getTicketByID(req,res) {
    let result = await service.read(req.params.id);

    if (result){
        res.status(200);
        res.send(result);
    }else{
        logger.error(error);

        res.status(404);

        res.send({
            error: "NOT-FOUND",
            message: "Der Ticket mit der ID Nummer Wurde im System nicht gefunden"
        });
    }

};