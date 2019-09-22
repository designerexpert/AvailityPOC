const express = require("express");
const path = require("path");

const apiRouter = require("./server/apiRouter.js");
const utils = require("./utils/matchingParenthesis");

const server = express();
const port = process.env.PORT || 8080;

server.use(express.json());

// Serving React app Build
server.use(express.static(path.join(__dirname, "client/build")));

// TODO: Implement Security Middleware here (To Restrict Routes below this point!)

// Api Router
server.use("/local-api", apiRouter);

// Catch All Else for React Router Dom to handle via index.html
server.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

server.listen(port, () => {
    console.log(`> Server is running on port: [${port}]`);
});
