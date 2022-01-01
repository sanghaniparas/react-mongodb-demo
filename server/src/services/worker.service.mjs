import WorkerModel from '../models/Worker.mjs'

export const createWorker = async ( worker) => {
    try {
        const newWorker = new WorkerModel(worker)
        const result = await newWorker.save()
        return { message: 'Worker was create successful', result }

    } catch (error) {
        console.log('newWorker', error)
        throw new Error(error.message)
    }
}

export const getAllWorkers = async ( ownerId ) => {
    try {
        const result =  await WorkerModel.find({ ownerId})
        return { result }
    } catch (error) {
        console.log('newWorker', error)
        throw new Error(error.message)
    }
}

export const updateWorkers = async ( _id, worker ) => {
    try {
        const result =  await WorkerModel.findByIdAndUpdate( _id ,{ ...worker },{ new: true }).exec()
        return { result }
    } catch (error) {
        console.log('updateWorkers', error)
        throw new Error(error.message)
    }
}

export const deleteWorkers = async ( _id, worker ) => {
    try {
        const result =  await WorkerModel.findByIdAndDelete( _id ).exec()
        return { result }
    } catch (error) {
        console.log('deleteWorkers', error)
        throw new Error(error.message)
    }
}