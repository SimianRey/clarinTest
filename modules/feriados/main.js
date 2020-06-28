const express = require('express'),
  router = express.Router(),
  feriadoMod = require('./modules/apiData')

router.get('/', function(req, res) {
  feriadoMod.getAll(req.app.get('config').db, req.query)
  .then( data => 
    res.send( {statusCode : 200, body : { payload: data} }  )
  )
  .catch( err =>
    res.send( {statusCode : 505, body : { err } }  ) 
  )
});

router.get('/:id', function(req, res) {
  feriadoMod.find(req.app.get('config').db, req.params.id)
  .then( data => 
    res.send( {statusCode : 200, body : { payload: data} }  )
  )
  .catch( err =>
    res.send( {statusCode : 505, body : { err } }  ) 
  )
});

router.get('/anio/:year', function(req, res) {
  feriadoMod.getByYear(req.app.get('config').db, req.params.year)
  .then( data => 
    res.send( {statusCode : 200, body : { payload: data} }  )
  )
  .catch( err =>
    res.send( {statusCode : 505, body : { err: err.toString() } }  ) 
  )
});

router.patch('/update', function(req, res) {
  feriadoMod.update(req.app.get('config').db, req.body)
  .then( data => 
    res.send( {statusCode : 200, body : { payload: data} }  )
  )
  .catch( err =>{
    res.send( {statusCode : 505, body : { err : err.toString() } }  ) }
  )
});



router.checkDbConn = (config) =>{
  return feriadoMod.checkDBConn(config)
}

router.inicialLoad = ( config ) => {  
  return feriadoMod.inicialLoad(config)
}

module.exports = router;
