import {db} from "../database.js";

export default function registerRoutes(app) {
    // Ganze Collection
    app.get("/api/events", getAllEvents);
};

function getAllEvents(req, res) {
    let result = db.data.Events;

    res.status(200);
    res.send(result);
}