const express = require("express");

const SessionController = require("./controllers/SessionController");
const OngController = require("./controllers/OngController");
const IncidentController = require("./controllers/IncidentController");
const ProfileController = require("./controllers/ProfileController");

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get("/ongs", OngController.index);
routes.post("/ongs", OngController.createOng);

routes.get("/incidents", IncidentController.index);
routes.post("/incidents", IncidentController.createIncident);
routes.delete("/incidents/:id", IncidentController.deleteIncident);

routes.get("/profile", ProfileController.index);

module.exports = routes;
