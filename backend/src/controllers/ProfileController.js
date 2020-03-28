const connection = require("../database/connection");

const index = async (request, response) => {
  const ong_id = request.headers.authorization;

  const incidents = await connection("incidents")
    .select("*")
    .where("ong_id", ong_id);

  return response.json(incidents);
};

module.exports = {
  index
};
