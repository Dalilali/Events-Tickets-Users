const express = require("express");

const users =  {

    UserId: 1,
    Name: "Out of Office",
    EMail: "Max@musterman.de"
};

const events =  {

    EventsId: 1,
    EventName: "Rock am Ring",
    Datum: "24-07-2024",
    Location: "Nürbergring",
    capacity: 20000
};

const tickets =  {  
    TicketI: 1,
    EventsId: 1,
    UserId:1,
    Price: 200,
    buyDate: "02-03-2024"
};

const userDB = await JSONFilePreset('db.json', { users })
const partyDB = await JSONFilePreset('db.json', { events })
const ticketDB = await JSONFilePreset('db.json', { tickets })


const app = express();

// Damit Body von HTTP-POST-Request als JSON interpretiert wird
app.use( express.json() );

app.get("v1/events" , (res,reg)=>{

    //get all Events
});

