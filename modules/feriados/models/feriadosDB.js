const mongo = require('mongodb'),
    MongoClient = mongo.MongoClient;

let connOptions = {
    useUnifiedTopology : true,
    useNewUrlParser: true,
    poolSize: 5,
    socketTimeoutMS : 30000 
}

const checkConn = (config) => {
    return new Promise ( (resolve, reject) => { 
        connect(config)
        .then( db => {
            if (!db){ 
                resolve(false)
                return;
            }                   
            db.close()
            resolve(true)        
        })
        .catch( reject )
    });
}

const connect = (config) => {
    return new Promise ( (resolve, reject) => { 
        let url = `mongodb://${config.host}:${config.port}/${config.dbName}`
        MongoClient.connect(url, connOptions)
        .then( client => resolve( client ) )
        .catch( err => reject(`DB Init Failed ${err}`) )
        });   
}

const getAll = (config) => {
    return new Promise ( (resolve, reject) => { 
        let dbClient;
        connect(config)
        .then( client => {
            dbClient = client
            let db = client.db(config.dbName);
            return db.collection('feriados').find().toArray() 
        })
        .then ( resolve )
        .catch(reject)
        .finally ( ()=>dbClient.close())
    });
}

const setBatch = (config, docs) => {
    return new Promise ( (resolve, reject) => { 
        let dbClient;
        connect(config)
        .then( client => {
            dbClient = client
            let db = client.db(config.dbName);
            return db.collection('feriados').insertMany(docs)
        })
        .then( resolve)
        .catch(reject)
        .finally ( ()=>dbClient.close())
    });
}

const findById = (config, id) => {
    return new Promise ( (resolve, reject) => { 
        let dbClient;
        connect(config)
        .then( client => {
            dbClient = client
            let db = client.db(config.dbName);
            return db.collection('feriados').find({_id:  new mongo.ObjectID(id) }).toArray() 
        })
        .then (resolve)
        .catch(reject)
        .finally ( ()=>dbClient.close())
    });
}

const find = (config, key, value) => {
    return new Promise ( (resolve, reject) => { 
        let dbClient;
        connect(config)
        .then( client => {
            dbClient = client
            let db = client.db(config.dbName);
            return db.collection('feriados').find( {[key] : value} ).toArray() 
        })
        .then (resolve)
        .catch(reject)
        .finally ( ()=>dbClient.close())
    });
}

const update = (config, event) => {
    return new Promise ( (resolve, reject) => { 
        let dbClient;
        connect(config)
        .then( client => {
            dbClient = client
            let db = client.db(config.dbName);
            let id = event._id
            delete event._id
            return db.collection('feriados')    
                .updateOne( {_id: new mongo.ObjectID(id)} , {$set: event } )
        })
        .then (()=>resolve())
        .catch(reject)
        .finally ( ()=>dbClient.close())
    });
}

module.exports = {connect, checkConn, setBatch,
                    getAll, find, update,
                    findById }
