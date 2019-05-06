// implement your API here
const express = require("express");
const db = require("./data/db.js");
const PORT = process.env.PORT;

const server = express();

// tells express to read json objects
server.use(express.json());

// GET all users
server.get("/api/users", (req, res) => {
	db
		.find()
		.then(users => {
			res.status(200).json(users);
		}).catch(({code, message}) => {
			res.status(code).json({
				success: false,
				message
			});
		});
});

// GET by id
server.get("/api/users/:id", (req, res) => {
	db
		.findById(req.params.id)
		.then((user) => {
			if (user) {
				res.status(200).json({
					success: true, 
					user
				})
			}
			if(!user) {
				res.status(404)
				.json({
					success: false,
					message: "Cannot find user by that id"
				})
			}
		}).catch(({code, message}) => {
			res.status(code).json({success: false, message})
		})
});

// POST by user
server.post("/api/users", (req, res) => {
	db
		.insert(req.body)
		.then(user => {
			res.status(201).json({success: true, user});
		}).catch(({code, message}) => {
			res.status(code).json({success: false, message})
		});
});

// DELETE by id
server.delete("/api/users/:id", (req, res) => {
	const {id} = req.params;
	db
		.remove(id)
		.then(deleted => {
			res.status(204).end();
		}).catch(({code, message}) => {
	res.status(code).json({success: false, message})
		});
})

server.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
