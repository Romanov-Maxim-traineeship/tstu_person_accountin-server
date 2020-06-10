import express from "express";
import { propOr, map, forEach } from "ramda";
const { ObjectID } = require("mongodb");
const PDFDocument = require("pdfkit");
const Excel = require("exceljs");

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

  router.get("/persons/pdf", async (req, res) => {
    try {
      const result = await getPersons();
      let filename = req.body.filename;
      res.pdfFromHTML({
        filename: `${filename}.pdf`,
        htmlContent: `<html><body><table> <tr> <th>Gender</th> <th>First Name</th> <th>Last Name</th> </tr> ${map(
          (person) =>
            `<tr><td>${propOr("other", "gender", person)}</td><td>${propOr(
              "N/A",
              "firstName",
              person
            )}</td><td>${propOr("N/A", "lastName", person)}</td></tr>`,
          result
        )} </table></body></html>`,
      });
    } catch (error) {
      res.send({ error: "An error has occurred" });
    }
  });

  router.get("/persons/excel", async (req, res) => {
    try {
      const persons = await getPersons();
      var workbook = new Excel.Workbook();

      workbook.creator = "Maksim Romanov";
      workbook.lastModifiedBy = "Maksim Romanov";
      workbook.created = new Date();
      workbook.modified = new Date();
      workbook.lastPrinted = new Date();

      workbook.views = [
        {
          x: 0,
          y: 0,
          width: 10000,
          height: 20000,
          firstSheet: 0,
          activeTab: 1,
          visibility: "visible",
        },
      ];

      var worksheet = workbook.addWorksheet("My Sheet");
      worksheet.columns = [
        { header: "Id", key: "_id", width: 10 },
        { header: "First NAme", key: "firstName", width: 32 },
        { header: "Last NAme", key: "lastName", width: 32 },
        { header: "Gender", key: "gender", width: 32 },
      ];

      forEach((person) => worksheet.addRow(person))(persons);

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=" + "Report.xlsx"
      );
      workbook.xlsx.write(res).then(function(data) {
        res.end();
        console.log("File write done........");
      });
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

{
  /* <tr>
    <td>Alfreds Futterkiste</td>
    <td>Maria Anders</td>
    <td>Germany</td>
  </tr> */
}
