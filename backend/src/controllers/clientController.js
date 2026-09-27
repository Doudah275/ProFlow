const clientService = require("../services/clientService");
const {
  successResponse,
} = require("../utils/response");

// REVIEW: Keep controllers thin, but document the service DTO contract and
// verify that every handler consistently forwards async failures to Express.
const createClient = async (req, res, next) => {
  try {
    const client = await clientService.createClient(
      req.body,
      req.user.id
    );

    return successResponse(
      res,
      201,
      client,
      "Client created successfully"
    );
  } catch (error) {
    next(error);
  }
};

const getAllClients = async (req, res, next) => {
  try {
    const clients = await clientService.getAllClients(
      req.user.id
    );

    return successResponse(
      res,
      200,
      clients,
      "Clients retrieved successfully"
    );
  } catch (error) {
    next(error);
  }
};

const getClientById = async (req, res, next) => {
  try {
    const client = await clientService.getClientById(
      req.params.id,
      req.user.id
    );

    return successResponse(
      res,
      200,
      client,
      "Client retrieved successfully"
    );
  } catch (error) {
    next(error);
  }
};

const updateClient = async (req, res, next) => {
  try {
    const client = await clientService.updateClient(
      req.params.id,
      req.body,
      req.user.id
    );

    return successResponse(
      res,
      200,
      client,
      "Client updated successfully"
    );
  } catch (error) {
    next(error);
  }
};

const deleteClient = async (req, res, next) => {
  try {
    const result = await clientService.deleteClient(
      req.params.id,
      req.user.id
    );

    return successResponse(
      res,
      200,
      null,
      result.message
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createClient,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient,
};