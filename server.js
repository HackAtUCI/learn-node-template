var express = require("express");
var app = express();
const bodyParser = require('body-parser');
const fs = require("fs");
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
let id = null;

function initializeDatabase()
{
    db.defaults({chores:{},count:0}).write();
    id = db.get("count").value();
}
initializeDatabase();


function addToDatabase(toAdd)
{
    db.get("chores").set(id,toAdd).write();
    ++id;
    db.update("count",n => n + 1).write();
}

function getAllChoresFromDatabase()
{
    return db.get("chores").value(); 
}


function deleteFromDatabase(id)
{
    console.log('chores[' + id + ']');
    db.unset('chores[' + id + ']').write();
}

app.use(allowCors);
function allowCors(req,res,next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Request-Method', '*');
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, DELETE, PUT');
    res.header('Access-Control-Allow-Headers', '*');
    next();
}

app.get("/pavage.js",function (req,res)
{
    res.end(fs.readFileSync("pavage.js"));
});


app.get("/background.jpg",function (req,res)
{
    res.end(fs.readFileSync("background.jpg"));
});

//TODO -----------------------------------------------
app.get('/',function (req,res) {
    res.end(fs.readFileSync("app.html"));
});

app.get("/getChores",function (req,res) {
    res.end(JSON.stringify(getAllChoresFromDatabase()));
})

app.get("/deleteChore",function(req,res) {
    deleteFromDatabase(req.query.cardID);
    res.end("success");
})


app.post("/addChore",bodyParser.json(),function (req,res) { 
    addToDatabase(req.body);
    res.end("success");
})


app.listen(3000,() => console.log("Running On localhost:3000"));