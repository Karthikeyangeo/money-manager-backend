import express, { response } from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { trackRouter} from './routes/track.js'
import cors from 'cors';

dotenv.config();  // getting all env keys from here
// import res from 'express/lib/response';
const app = express()

app.use(express.json());
// const MONGO_URL = "mongodb://localhost";

app.use(cors());
const MONGO_URL = process.env.MONGO_URL;

//To create connection 
async function createConnection(){
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("MongoDB connected");
    return client;
}

//calling that function 
export const client = await createConnection();        //await outside async fun allowed only in "type" :"module"

const PORT = process.env.PORT;

app.get('/', (req, res)=> {
  res.send('Welcome to Money Manager')
})

app.listen(PORT,()=>{
    console.log(`Server is up and running at ${PORT}`)
})

app.use('/track',trackRouter)