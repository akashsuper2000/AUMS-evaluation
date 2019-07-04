const express = require('express');
const path = require('path');
var http = require('http');
var url = require('url');
var bodyParser = require('body-parser');
const { spawn } = require('child_process')

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'client/build')));

function onreq(req,res){

	var user = req.body.user;
	var pass = req.body.pass;
    const process = spawn('python', ['./aumseval.py', user, pass]);

 //    const out = []
 //    process.stdout.on(
 //      'data',
 //      (data) => {
 //        out.push(data.toString());
 //        res.sendStatus(data);
 //      }
 //    );


 //    const err = []
 //    process.stderr.on(
 //      'data',
 //      (data) => {
 //        err.push(data.toString());
 //        res.sendStatus(data);
 //      }
 //    );

 //    process.on('exit', (code, signal) => {
 //      res.sendStatus(`${code} (${signal})`);
 //      resolve(out);
 //    });

	// });
}

app.post('/api', onreq);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);