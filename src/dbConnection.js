const {MongoClient} = require('mongodb');

const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'test';I

// promisify,  dbConnection retorna una promesa
export const dbConnection = () =>
  new Promise((resolve, reject) => {
    // https://docs.mongodb.com/manual/reference/method/connect/ http://mongodb.github.io/node-mongodb-native/3.6/api/
    MongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
      if (err) {
        reject(err);
      } else {
        console.log('dbConnection connected successfully to server'); // prt servidor

        // devuelve la promesa de esa bdd seleccionada (async)
        resolve(client.db(dbName));
      }
    });
  });
