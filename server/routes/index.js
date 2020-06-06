import express from "express";
const { ObjectID } = require("mongodb");

import { personsDbCollectionActions } from "../services/persons";

export default (db) => {
  const router = express.Router();
  const {
    addNewPerson,
    getPerson,
    deletePerson,
    updatePerson,
    getPersons,
  } = personsDbCollectionActions(db);

  router.get("/persons", async (req, res) => {
    try {
      const result = await getPersons();
      res.send(result);
    } catch (error) {
      res.send({ error: "An error has occurred" });
    }
  });

  router.post("/persons", async (req, res) => {
    try {
      const result = await addNewPerson(req.body);
      res.send(result.ops[0]);
    } catch (error) {
      res.send({ error: "An error has occurred" });
    }
  });

  router.get("/persons/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const result = await getPerson(new ObjectID(id));
      res.send(result);
    } catch (error) {
      res.send({ error: "An error has occurred" });
    }
  });

  router.delete("/persons/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const { result } = await deletePerson(new ObjectID(id));
      res.send(result);
    } catch (error) {
      res.send({ error: "An error has occurred" });
    }
  });

  router.patch("/persons/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const { result } = await updatePerson(new ObjectID(id), req.body);
      res.send(result);
    } catch (error) {
      res.send({ error: "An error has occurred" });
    }
  });

  return router;
};
