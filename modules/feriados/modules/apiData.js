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
	await importFullYear(config, year)
}

const getAll = (config) => {
	return feriadosDB.getAll(config)
}

const getByYear = async (config, year) => {
	return new Promise ( (resolve, reject) => { 
		if (!year) { throw `Invalid Param year` }
		feriadosDB.find(config, 'anio', parseInt(year) )
		.then( docs =>{
			if (!docs || docs.length == 0){
				importFullYear(config, year)
				.then( resolve )
				.catch( reject)
			} else {
				resolve( parseFeriados(docs) )
			}
		})
		.catch(reject)
	});
}

const find = (config, id) => {
	return new Promise ( (resolve, reject) => { 
		if (!id) { throw `Invalid Param id` }
		return feriadosDB.findById(config, id)
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


const importFullYear =  (config, year)  =>{
	return new Promise ( (resolve, reject) => { 
		getFeriadosFromAPI(year)
		.then( data =>{
			data.forEach( f => f.anio =  parseInt(year)) //Add year for future use
			return feriadosDB.setBatch(config, data)
		})
		.then( (result) => {
			resolve( parseFeriados(result.ops) )
		})
	});
	
}

module.exports = {
	getFeriadosFromAPI, checkDBConn, inicialLoad,
	getByYear,
	getAll, find, update
}


//Aux
const parseFeriados = docs =>{
	let feriados = { 1:[], 2:[], 3:[], 4:[], 5:[], 6:[], 
					7:[], 8:[], 9:[], 10:[], 11:[], 12:[] }
	
	docs.forEach( i => feriados[i.mes].push(i) )
	return feriados
}