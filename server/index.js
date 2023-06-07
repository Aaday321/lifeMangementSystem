import express from "express";

import mongoose from "mongoose"
import bodyparser from "body-parser"
import cors from "cors"

import cookieParser from  "cookie-parser";
//const prompt = require('prompt-sync')({});
export const ROOT_ROUTE = 'NEWTODO';
import { LIST, MAINTENANCE } from "./controllers/list";

export const listActions = {
  ADD:'addToDo'
}

const app = new express()
const PORT = 4015
const APP_NAME = "TO DO LIST"
const ATLAL_URL = `mongodb+srv://Ade-user-2:admin123@cluster0.oe5ybr1.mongodb.net/test`
const CLIENT_URL = "http://127.0.0.1:5173/";
let listenForCommands = true

const COMPAS_URL = `mongodb://127.0.0.1/${ROOT_ROUTE}`



//mongo connection
mongoose.Promise = global.Promise
mongoose.connect(COMPAS_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)

//bodyparser setup
app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())

//set up cookies parser
app.use(cookieParser())

//CORS setup
app.use(cors())

//Routes
//clientRoutes(app);

app.get('/', (req, res) =>{
    res.send(
    `<div style='width: 100vw; height:100vh; display: flex; justify-content: center; align-items: center;'>\
    <a style= 'font-size: 50px;' href='${CLIENT_URL}' >You look lost kid. Go to front end<a/>\
    </div>`
    )
});

app.listen(PORT, ()=>{
        console.log(`The ${APP_NAME} server is running on port: ${PORT}`)
        console.log("SERVER IS RUNNING - SUCCESS")
    }
);


//ROUES

app.route(`/login`)
    .post((req, res)=>{

        const password = req.body.password;

        if(password === "soundwave"){
            res.cookie('loginStatus', 'hellagood')
            res.send({ msg: "hellagood" })
            console.log("EVERYTHING WORKING ON THE SERVER SIDE :)");
        } else {
            res.send({ msg: "Wrong Password" })
        }
    });

app.route('/list')
    .get(async (req, res)=>res.send(await LIST.getList()))
    .post(async (req, res)=>{
        const action = req.query.action;
        switch(action){
            case listActions.ADD:
                const newDo = req.body.content;
                res.send(await LIST.addItem(newDo)); break;
        }
    })
app.route('/maintenance')
    .get(async(req, res)=>res.send(await MAINTENANCE.cleanList()))
