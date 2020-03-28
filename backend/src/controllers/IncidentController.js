const crypto = require("crypto");
const connection = require("../database/connection");

const index = async (request, response) => {
  const { page = 1 } = request.query;

  const [count] = await connection("incidents").count();

  const incidents = await connection("incidents")
    .select([
      "incidents.*",
      "ongs.name",
      "ongs.email",
      "ongs.whatsapp",
      "ongs.city",
      "ongs.uf"
    ])
    .join("ongs", "ongs.id", "=", "incidents.ong_id")
    .limit(5)
    .offset((page - 1) * 5);

  response.header("X-Total-Count", count["count(*)"]);

  return response.json(incidents);
};

const createIncident = async (request, response) => {
  const { title, description, value } = request.body;

  const ong_id = request.headers.authorization;

  const result = await connection("incidents").insert({
    title,
    description,
    value,
    ong_id
  });

  const id = result[0];

  return response.json({ id });
};

const deleteIncident = async (request, response) => {
  const { id } = request.params;
  const ong_id = request.headers.authorization;

  const incident = await connection("incidents")
    .select("ong_id")
    .where("id", id)
    .first();

  if (incident.ong_id !== ong_id) {
    return response.status(401).json({ error: "Operation not allowed." });
  }

  await connection("incidents")
    .where("id", id)
    .andWhere("ong_id", ong_id)
    .delete();

  return response.status(204).send();
};

module.exports = {
  createIncident,
  index,
  deleteIncident
};
