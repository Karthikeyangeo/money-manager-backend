import { client } from "./index.js";
import { ObjectId } from "mongodb";

//get all tracks
async function getAllData(filter){
    return await client.db('money-manager')
            .collection('track')
            .find(filter)
            .toArray()
}

//get data by ID 
async function getDataByID(id){
    // ObjectID function is used to change the id to object ID 
    return await client.db('money-manager')
    .collection('track')
    .findOne({ _id: ObjectId(id)});
}

//add data 
async function createData(data){
    return await client.db('money-manager')
    .collection('track')
    .insertMany(data);
}

// delete data by ID
async function deleteDataByID(id) {
    return await client.db('money-manager')
    .collection('track')
    .deleteOne({  _id: ObjectId(id)});
  }


// update data by ID
async function updateDataByID(id,updatedData) {
    return await client.db('money-manager')
    .collection('track')
    .updateOne({ _id: ObjectId(id)},{$set:updatedData});
  }

export {
    getAllData,
    getDataByID,
    createData,
    deleteDataByID,
    updateDataByID
}