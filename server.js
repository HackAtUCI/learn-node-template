var express = require("express");
var app = express();
const bodyParser = require('body-parser');
const fs = require("fs");
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
let id = null;

console.log("All Dependencies Properly Installed");

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

/*
// TODO 1: Setup the endpoint for serving the website.
// Note: You can send any content that is pass back via res.write() or res.end()
app.get('/',function (req,res) {
    // TODO 2: Serve the html webpage
    res.end(fs.readFileSync("app.html"));
});
*/

/*
//TODO 3: Setup the endpoint for adding new chores
//Note: We are using the POST method because we expect data to be sent with the body of the request
//Note: bodyParser is a middleware that convert JSON string send with the body to an object that we can work with.
app.post("/addChore",bodyParser.json(),function (req,res) {
    //TODO 4: Adding data 
    //Explain the method of adding to the database
    addToDatabase(req.body);
    //TODO 5: End the request with a success message
    res.end("success");
})
*/	



/*
//TODO 6: Add endpoint for getting all the chores from the database
app.get("/getChores",function (req,res) {
    //Explain the getAllChoresFromDatabase() method
    res.end(JSON.stringify(getAllChoresFromDatabase()));
})
*/

/*

//TODO 7: Add endpoint for deleting a chore when it is completed
//Note: The data being passed will be part of the url which is called a query
app.get("/deleteChore",function(req,res) {
    //Explain the deleteFromDatabase() method
    deleteFromDatabase(req.query.cardID);
    res.end("success");
})
*/



app.listen(3000,() => console.log("Running On localhost:3000"));