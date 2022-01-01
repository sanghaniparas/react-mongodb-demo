import express from 'express'
import * as workerController from '../controllers/worker.controller.mjs'
import { checkAuth } from '../middlewares/checkAuth.mjs';



const workerRouter = express.Router();

workerRouter.get('/', checkAuth , workerController.getWorkers)
workerRouter.post('/', checkAuth , workerController.createWorker)
workerRouter.patch('/:workerId', checkAuth , workerController.updateWorker)
workerRouter.delete('/:workerId', checkAuth , workerController.deleteWorker)
export default workerRouter