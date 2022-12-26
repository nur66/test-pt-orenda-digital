import express,{Request, Response} from "express"
import { createConnection } from "typeorm"
import * as bodyParser from  "body-parser";
// import { User } from './entity/User'

import { router } from "./routes/user"
// import {router} from './routes/routes'
const app = express()
const PORT = 2311
app.use(bodyParser.json());
app.use('/api', router)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Methods', 'Content-Type, Authorization');
    next();
})

createConnection({
    type:"mysql",
    host:"localhost",
    port:3306,
    username:"root",
    password:"",
    database:"db_tes_pt_orenda_digital",
    synchronize:true,
    entities:['./src/entity/*.ts'],
    // entities:[User],
    logging:true
}).then(()=> {
    console.log("DB Connected")
}).catch((e) => {
    console.log("Error : " + e)
})

// Testing
app.get('/test', (req:Request, resp:Response) => {
    resp.json({
        data: "test done"
    })
})

app.listen(PORT, ():void => {
    console.log("\u{1f525}\u{1f525}\u{1f525} Server is running on PORT : " + PORT)
})