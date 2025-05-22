console.log('Serveur redémarré !!');
const express = require('express'); // Importation de express
const bodyParser = require('body-parser');
const pool = require('./db'); // Importation de la DB
const cors = require('cors'); // Importation du CORS

const app = express();
//Permettre les requêtes CORS pour ton frontend
app.use(cors({
    origin: 'http://localhost:3000'
}));
const port = 3001;

//Middleware pour requête JSON
app.use(bodyParser.json());

//Route GET, récupération
app.get('/api/voitures', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM voiture'); //Requête SQL
        res.json(result.rows); // Prendre les données sous forme de tableau JSON
        console.log('Serveur redémarré30');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur de la bdd');
    }
});

//Route POST pour ajouter une nouvelle voiture
app.post('/api/voitures', async (req, res) => {
    const {modele, prix, description, image, date, proprietaire } = req.body;

    console.log('Données reçues:', req.body); // Log les données envoyées depuis le frontend

    if (!modele || !prix || !description || !proprietaire || !image || !date) {
        console.log('Champs manquants:', {modele, prix, description, image, date, proprietaire });
        return res.status(400).json({ Message: "Tous les champs sont requis" });
    }

    try {
        // Log des données avant l'insertion dans la base
        console.log('Insertion dans la base de données avec les valeurs:', {modele, prix, description, image, date, proprietaire });

        // Requête pour insérer dans la BDD
        const result = await pool.query(
            'INSERT INTO voiture (modele, prix, description, images, date, proprietaire) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [modele, prix, description, image, date, proprietaire]
        );

        // Log de la voiture ajoutée
        console.log('Voiture ajoutée:', result.rows[0]);

        res.status(201).json(result.rows[0]); 
    } catch (err) {
        console.error('Erreur lors de l\'ajout de la voiture:', err);  // Log des erreurs
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

//Route DELETE
app.delete('/api/voitures/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            'DELETE FROM voiture WHERE id = $1 RETURNING *',
            [id]
        );

        if(result.rows.length === 0) {
            return res.status(404).json({message: 'Voiture non trouvée'});
        }

        console.log('Voiture supprimée:', result.rows[0]);
        res.status(200).json({message: 'Voiture supprimée', voiture: result.rows[0]})
    } catch (err) {
        console.error('Erreur lors de la suppression : ', err);
        res.status(500).json({message: 'Erreur serveur' });
    }
});

//Route PUT pour Update
app.put('/api/voitures/:id', async (req, res) => {
    const { id } = req.params; //Recuperer l'id de la voiture
    const { modele, prix, description, image, date, proprietaire} = req.body;

    console.log("Données re¸ues : ", req.body);

    if(!modele || !prix || !description || ! proprietaire || !image || !date) {
        console.log("Champs manquants", {modele, prix, description, image, date, proprietaire})
        return res.status(400).json({ Message: "Tous les champs sont requis"});
    }

    try {
        //Log
        console.log("MàJ de la BDD avec les valeurs : ", {modele, prix, description, proprietaire, image, date})

        const result = await pool.query(
            'UPDATE voiture SET modele = $1, prix = $2, description = $3, images = $4, date = $5, proprietaire = $6 WHERE id = $7 RETURNING *',
            [modele, prix, description, image, date, proprietaire, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Voiture non trouvée"});
        }

        console.log("Voiture MàJ : ", result.rows[0]);

        res.status(200).json(result.rows[0]);
    } catch(err) {
        console.error("Erreur lors de la mise a jour de la voiture : ", err);
        res.status(500).json({ message : 'Erreur serveur'});
    }
})

//Écoute du port
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
  });
