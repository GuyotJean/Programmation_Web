//Utilisation de pg une librairie PostgreSQL
const { Pool } = require('pg');

//Créer une instance de Pool pour connexion à PostgreSQL
const pool = new Pool({
    user : 'postgres',
    host: 'localhost',
    database: 'Garage_Database',
    password: '123',
    port : 5432
});

pool.connect()
    .then(() => {
        console.log('Connexion à PostgreSQL réussie !');
    })
    .catch((err) => {
        console.error('Erreur de connexion à PostgreSQL', err);
    });

module.exports = pool;