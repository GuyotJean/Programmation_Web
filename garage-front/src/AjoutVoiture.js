import { useState } from 'react';

function AjoutVoiture() {
    const [formData, setFormData] = useState({
        modele: '',
        prix: 0,
        description: '',
        image:'',
        date: '',
        proprietaire: ''
    });

const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({...prev, [name]: value }));
}

const handleSubmit = e => {
    e.preventDefault();

    fetch('/api/voitures', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
    })
    .then(res => {
        if (!res.ok) {
            // Log l'erreur HTTP
            console.error('Erreur de la réponse:', res.statusText);
            return res.json().then(errorData => {
                throw new Error(errorData.message || 'Erreur lors de l\'ajout');
            });
        }
        return res.json(); // Parse la réponse JSON
    })
    .then(data => {
        console.log('Voiture ajoutée avec succès:', data);
        alert('Voiture ajoutée !');
        setFormData({
            modele:'',
            prix:0,
            description:'',
            image:'',
            date:'',
            proprietaire:''
        });
    })
    .catch(err => {
        // Log de l'erreur capturée
        console.error('Erreur capturée:', err);
        alert("Erreur lors de l'ajout de la voiture");
    });
};

return (
    <div>
        <h1>Ajouter une nouvelle voiture</h1>
        <form onSubmit={handleSubmit}>
            <input type = "text" name = "modele" placeholder="Modèle" value={formData.modele} onChange = {handleChange} required/>
            <input type = "text" name = "prix" placeholder="Prix" value={formData.prix} onChange = {handleChange} required/>
            <input type = "text" name = "description" placeholder = "Description" value = {formData.description} onChange = {handleChange} required/>
            <input type = "text" name = "image" placeholder="Image" value={formData.image} onChange = {handleChange} required/>
            <input type = "text" name = "date" placeholder="Date" value={formData.date} onChange = {handleChange} required/>
            <input type = "text" name = "proprietaire" placeholder = "Proprietaire" value = {formData.proprietaire} onChange = {handleChange} required/>
            <button type = "submit">Ajouter</button>
        </form>
    </div>
);
};

export default AjoutVoiture;