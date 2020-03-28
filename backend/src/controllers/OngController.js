const crypto = require("crypto");
const connection = require("../database/connection");

const index = async (request, response) => {
  const ongs = await connection("ongs").select("*");

  return response.json(ongs);
};

const createOng = async (request, response) => {
  const { name, email, whatsapp, city, uf } = request.body;

  const id = crypto.randomBytes(4).toString("HEX");

  await connection("ongs").insert({
    id,
    name,
    email,
    whatsapp,
    city,
    uf
  });

  return response.json({ id });
};

module.exports = {
  createOng,
  index
};
