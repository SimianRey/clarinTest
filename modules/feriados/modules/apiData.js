const fetch = require('node-fetch'),
	feriadosDB = require('../models/feriadosDB');

const getFeriadosFromAPI = (year) => {
	return new Promise((resolve, reject) => {
		if (!year || isNaN(year)) throw 'Invalid Parameter'
		fetch(`http://nolaborables.com.ar/api/v2/feriados/${year}`)
			.then(res => res.json())
			.then(json => resolve(json))
			.catch(err => reject(`Get Request Failed: ${err}`))
	})
}

const checkDBConn = (config) => {
	return feriadosDB.checkConn(config)
}

const inicialLoad = async (config) => {
	let docs = await feriadosDB.getAll(config)
	if (docs && docs.length != 0) return; //At least some data already exist, continue loading
	let year = new Date().getFullYear();
	let feriados = await getFeriadosFromAPI( year ) 
	feriados.forEach( f => f.anio =  year) //Add year for future use
	await feriadosDB.setBatch(config, feriados) 
}

const getAll = (config) => {
	return feriadosDB.getAll(config)
}

const find = (config, id) => {
	return new Promise ( (resolve, reject) => { 
		if (!id) { throw `Invalid Param id` }
		return feriadosDB.find(config, id)
		.then( resolve )
		.catch(reject)		
	});	
}

const update = (config, body) => {
	return new Promise ( (resolve, reject) => { 
		if (!body || !body.feriado) { throw `Invalid Param feriado` }	
		let feriado = body.feriado

		if (!feriado || !feriado._id) { throw `Invalid Param _id` }		
		if (!feriado.mes || !feriado.mes || isNaN(feriado.mes) || feriado.mes > 12 ) { throw `Invalid Param mes` }
		if (!feriado.dia || !feriado.dia || isNaN(feriado.dia) || feriado.mes > 31 ) { throw `Invalid Param dia 1` }
		if (!feriado.anio || !feriado.anio || isNaN(feriado.anio)) { throw `Invalid Param anio` }
		if (feriado.dia > new Date(feriado.anio, feriado.mes, 0).getDate() ) { throw `Invalid Param dia` }

		return feriadosDB.update(config, feriado)
		.then( resolve)
		.catch(reject)
	});	
}

module.exports = {
	getFeriadosFromAPI, checkDBConn, inicialLoad,
	getAll, find, update
}
