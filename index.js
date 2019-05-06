// implement your API here
const express = require("express");
const db = require("./data/db.js");
const PORT = process.env.PORT;

const server = express();

// tells express to read json objects
server.use(express.json());

server.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
