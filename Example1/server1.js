const http = require("http");

const hostname = '127.0.0.1';
const port = 3000;

//Place your name here
const name = "Bob"

function main(req,res)
{
    if (req.url == "/home" && req.method == "GET"){
        console.log("home page served");
        res.end("Hello world");
    }
    else if (req.url == "/getName"&& req.method == "GET")
    {   
        res.setHeader("Access-Control-Allow-Origin","*");;
        res.end(name);
    }
}

const server=http.createServer(main);

server.listen(port,hostname,() => console.log("Server started"));