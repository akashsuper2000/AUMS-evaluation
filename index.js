const express = require('express');
const path = require('path');
var http = require('http');
var url = require('url');
var bodyParser = require('body-parser');
const { spawn } = require('child_process')

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

function onreq(req,res){

	var user = req.body.user;
	var pass = req.body.pass;
    const process = spawn('python', ['./aumseval.py', user, pass]);
}

app.post('/api', onreq);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

