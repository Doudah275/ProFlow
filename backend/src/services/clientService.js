const { Client } = require("../models");

const createClient = async (clientData, userId) => {
  // REVIEW: Spreading request data into persistence couples the API shape to
  // model attributes. Prefer an allowlisted DTO so future fields cannot be
  // mass-assigned accidentally.
  return await Client.create({
    ...clientData,
    userId,
  });
};

const getAllClients = async (userId) => {
  return await Client.findAll({
    where: { userId },
    order: [["createdAt", "DESC"]],
  });
};

const getClientById = async (id, userId) => {
  const client = await Client.findOne({
    where: {
      id,
      userId,
    },
  });

  if (!client) {
    const error = new Error("Client not found");
    error.statusCode = 404;
    throw error;
  }

  return client;
};

const updateClient = async (id, clientData, userId) => {
  const client = await getClientById(id, userId);

  // REVIEW: Apply the same allowlist used for create; raw update payloads can
  // otherwise bypass the service's intended field contract.
  await client.update(clientData);

  return client;
};

const deleteClient = async (id, userId) => {
  const client = await getClientById(id, userId);

  await client.destroy();

  return {
    message: "Client deleted successfully",
  };
};

module.exports = {
  createClient,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient,
};