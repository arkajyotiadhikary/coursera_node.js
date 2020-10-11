const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');



const app = express();
const port = 3000;
const host = 'localhost';

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(morgan('dev'));


app.all('/dishes',(req,res,next)=>{
    res.statusCode = 400;
    res.setHeader('Content_Type','text/plain');
    next();
});

// ___________________________________________________________________________________


app.get('/dishes',(req,res,next)=>
{
    res.end('Will send all the dishes to you!');
});

app.post('/dishes',(req,res,next)=>
{
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
});

app.put('/dishes',(req,res,next)=>
{
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
});

app.delete('/dishes', (req, res, next) => {
    res.end('Deleting all dishes');
});

// ___________________________________________________________________________________


app.get('/dishes/:dishId', (req,res,next) => {
    res.end('Will send details of the dish: ' + req.params.dishId +' to you!');
});

app.post('/dishes/:dishId', (req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /dishes/'+ req.params.dishId);
});

app.put('/dishes/:dishId', (req, res, next) => {
  res.write('Updating the dish: ' + req.params.dishId + '\n');
  res.end('Will update the dish: ' + req.body.name + 
        ' with details: ' + req.body.description);
});

app.delete('/dishes/:dishId', (req, res, next) => {
    res.end('Deleting dish: ' + req.params.dishId);
});

// ___________________________________________________________________________________


app.use((req,res,next)=>{
    console.log(req.headers);

    res.statusCode = 200;
    res.setHeader("Content_Type","text/html");
    res.end("<html><body><h1>Hello World!!</h1></body></html>")
});

const server =  http.createServer(app);
server.listen(port,host,()=>
{
    console.log(`Server is running at ${host}:${port}}`);
});