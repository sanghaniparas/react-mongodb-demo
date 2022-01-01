import HttpStatus from "http-status-codes";
import * as workerServices from "../services/worker.service.mjs";

export const createWorker = async (req, res) => {
  const { userId: ownerId, worker } = req.body;
  if (!ownerId || !worker) {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: "Invalid request" });
  }
  const newWorker = {
    ...worker,
    ownerId,
  };
  try {
    const result = await workerServices.createWorker(newWorker);
    return res.status(HttpStatus.OK).json({...result});
  } catch (error) {
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Something wrong, please repeat request", error });
  }
};

export const getWorkers = async (req, res) => {
  const { userId: ownerId } = req.body;
  try {
    const result = await workerServices.getAllWorkers(ownerId);
    if (!result) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: "Create failed",
      });
    }
    return res.status(HttpStatus.OK).json({...result});

  } catch (error) {
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Something wrong, please repeat request", error });
  }
};

export const updateWorker = async (req, res) => {
  const { workerId: _id } = req.params;
  const properties = req.body;
  try {
    const result = await workerServices.updateWorkers(_id, properties);
    if (!result) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: "Update failed",
      });
    }
    return res.status(HttpStatus.OK).json({...result});
  } catch (error) {
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Something wrong, please repeat request", error });
  }
};

export const deleteWorker = async (req, res) => {
  const { workerId: _id } = req.params;
  try {
    const result = await workerServices.deleteWorkers(_id);
    if (!result) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: "Delete failed",
      });
    }
    return res.status(HttpStatus.OK).json({...result});
  } catch (error) {
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Something wrong, please repeat request", error });
  }
};
