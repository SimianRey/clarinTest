const config = { //This params may come from config file, or environment
  main: {
      port: 33111,
  },
  db : {
      dbName: 'CLARIN_TEST',
      host: 'localhost',
      port: 27017
  }
};

const http = require('http'),
  createError = require('http-errors');
  express = require('express');
  path = require('path');
  app = express();

let server;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


//Module
const  feriadosMod = require('./modules/feriados/main'); 
app.use('/feriados', feriadosMod);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Response Error
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send(err);
});

app.set('config', config);

//Server
const initServer = () => {
  server = http.createServer(app);
  server.listen(config.main.port);
  server.on('error', onError);
  server.on('listening', onListening);
  
  function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }
  }
  
  function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    console.log('Listening on ' + bind);
  }
}

//

async function startApp (){
  try {
    let dbStatus = await feriadosMod.checkDbConn(config.db)
    await feriadosMod.inicialLoad(config.db) //Load documents with data of the current year if collection is empty
    initServer()  
  } catch (error) {
    console.log(`Program Initialize Failed. Error: ${error}`);
    process.exit(1);
  }  
}

module.exports = app;

startApp()