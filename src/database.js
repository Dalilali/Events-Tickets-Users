import { JSONFilePreset } from "lowdb/node";

const defaultData = {
    Users: [{

        UserId: 1,
        Name: "Max Musterman",
        EMail: "Max@musterman.de"
    }],

    Events: [
        {
            EventsId: 1,
            EventName: "Rock am Ring",
            Datum: "24-07-2024",
            Location: "Nürbergring",
            capacity: 20000
        }
    ],
    Tickts: [
        {
            TicketId: 1,
            EventsId: 1,
            UserId: 1,
            Price: 200,
            buyDate: "02-03-2024"
        }
    ]
};

export const db = await JSONFilePreset("db.json", defaultData);

export function findIndex(dataset, id) {
    return dataset.findIndex(entry => entry.id === id);
}

export function getNextId(dataset) {
    let maxId = -1;
    for (let entry of dataset || []) maxId = Math.max(maxId, entry.id);
    return maxId + 1;
}

export default { db, findIndex, getNextId };