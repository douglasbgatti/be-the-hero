const connection = require("../database/connection");

const create = async (request, response) => {
  const { id } = request.body;

  const ong = await connection("ongs")
    .select("name")
    .where("id", id)
    .first();

  if (!ong) {
    return response.status(400).json({ error: `No ONG found with ID: ${id}` });
  }

  return response.json(ong);
};

module.exports = {
  create
};
