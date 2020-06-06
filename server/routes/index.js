import express from "express";

import { personsDbCollectionActions } from "../services/persons";

export default db => {
	const router = express.Router();
	const { addNewPerson } = personsDbCollectionActions(db);

	router.post("/persons/new", async (req, res, next) => {
		try {
			const result = await addNewPerson(req.body);
			res.send(result.ops[0]);
		} catch (error) {
			console.log("error :>> ", error);
			res.send({ error: "An error has occurred" });
		}
	});

	return router;
};
