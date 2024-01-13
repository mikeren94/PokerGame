const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const Table = require("./Classes/Table");
const User = require("./Classes/Users");
const Hand = require("./Classes/Hand");

require("./tests/handRankingTest");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

let users = [];

io.on("connection", (socket) => {
    /*console.log(`User Connected: ${socket.id}`);
    users.push(new User(socket.id));

    socket.on("dealCards", () => {
        startGame();
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    });*/
});

handRankingTest();

/*
function startGame() {
    console.log('starting game');
    let table = new Table();
    let holeCardCount = 2;

    for(let i = 0; i < holeCardCount; i++) {
        for (let c = 0; c < users.length; c++) {
            // give this user the top card from the deck
            let card = table.deck[0];
            users[c].holeCards.push(card);
            // remove the top card from the deck
            table.deck.shift();
            console.log('send card ' + i + ' to player '  + users[c].id);
            io.emit(`sendCard#${users[c].id}`, card);
        }
    }

    // Burn 1 card and deal the flop
    table.deck.shift();
    for(let i = 0; i < 3; i++) {
        table.board.push(table.deck[0]);
        table.deck.shift();
    }

    console.log('sending flop');
    // Send the flop to the players
    io.emit(`sendBoard`, table.board);
}*/

server.listen(3001, () => {
    console.log("SERVER IS RUNNING");
});
