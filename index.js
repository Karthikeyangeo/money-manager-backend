import express, { response } from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();  // getting all env keys from here
// import res from 'express/lib/response';
const app = express()

app.use(express.json());
// const MONGO_URL = "mongodb://localhost";

const MONGO_URL = process.env.MONGO_URL;

const value_data=[
    {
        desc:"Salary",
        amount:"50000",
        date :"02/05/2022 07:42 pm",
        type:"income"
    },
    {
        desc:"Salary",
        amount:"50000",
        date :"02/05/2022 07:42 pm",
        type:"income"
    },
    {
        desc:"Movie",
        amount:"800",
        date :"02/05/2022 07:42 pm",
        type:"expense"
    },
    {
        desc:"Dinner",
        amount:"1500",
        date :"02/05/2022 07:42 pm",
        type:"expense"
    }
];

//To create connection 
async function createConnection(){
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("MongoDB connected");
    return client;
}

//calling that function 
const client = await createConnection();        //await outside async fun allowed only in "type" :"module"

const PORT = 9000;

app.get('/', (req, res)=> {
  res.send('Hello World')
})

app.get('/track',async(req,res)=>{
    console.log(req.query)
    const filter=req.query;
    const filtData = await client.db('money-manager').collection('track').find(filter).toArray() ;
    res.send(filtData)
    
    
});
app.post('/track',async(req,res)=>{
    
    const data = req.body;
    console.log(`Incoming data ${data}`)
    const result = await client.db('money-manager').collection('track').insertMany(data) ;
    res.send(result)
    
    
});
app.listen(PORT,()=>{
    console.log(`Server is up and running at ${PORT}`)
})