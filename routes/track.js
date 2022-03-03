import express from "express";
const router = express.Router();
import {client} from '../index.js'
import { getAllData, getDataByID, createData, deleteDataByID, updateDataByID} from '../helper.js';


router
    .route("/")
    .get(async(req,res)=>{
        console.log(req.query)
        const filter=req.query;
        const filtData = await getAllData(filter) ;
        res.send(filtData)
        
        
    })
    .post(async(req,res)=>{
    
    const data = req.body;
    console.log(`Incoming data ${data}`)
    const result = createData(data) ;
    res.send(result)
    
    
});

router
    .route("/:id")
    .get(async(req,res)=>{
        const {id} = req.params;

        const data = await getDataByID(id);
        console.log(data);
        data ? res.send(data): res.status(404).send({msg:`Data not found`});
    })
    .put(async(req,res)=>{
        //update by ID
        const {id} = req.params;
        const updatedData = req.body;

        // db.track.updateOne({"id":"105"},{$set:updatedData})
        const data = await updateDataByID(id,updatedData);
        console.log(data);
        data ? res.send(data): res.status(404).send({msg:`Data not found`});
    })
    .delete(async(req,res)=>{
        //delete by ID
        const {id} = req.params;
        

        // db.movies.deleteOne({"id":"105"})
        const data = await deleteDataByID(id);
        console.log(data);
    
        data ? res.send(data): res.status(404).send({msg:`Data not found`});
    })    

export const trackRouter = router;