const express = require('express');
const path = require('path');
var http = require('http');
var url = require('url');
var bodyParser = require('body-parser');
const { spawn } = require('child_process')

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

const extendTimeoutMiddleware = (req, res, next) => {
  const space = ' ';
  let isFinished = false;
  let isDataSent = false;

  // Only extend the timeout for API requests
  if (!req.url.includes('/api')) {
    next();
    return;
  }

  res.once('finish', () => {
    isFinished = true;
  });

  res.once('end', () => {
    isFinished = true;
  });

  res.once('close', () => {
    isFinished = true;
  });

  res.on('data', (data) => {
    // Look for something other than our blank space to indicate that real
    // data is now being sent back to the client.
    if (data !== space) {
      isDataSent = true;
    }
  });

  const waitAndSend = () => {
    setTimeout(() => {
      // If the response hasn't finished and hasn't sent any data back....
      if (!isFinished && !isDataSent) {
        // Need to write the status code/headers if they haven't been sent yet.
        if (!res.headersSent) {
          res.writeHead(202);
        }

        res.write(space);

        // Wait another 15 seconds
        waitAndSend();
      }
    }, 15000);
  };

  waitAndSend();
  next();
};

app.use(extendTimeoutMiddleware);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

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

const port = process.env.PORT || 5000;
app.listen(port);

