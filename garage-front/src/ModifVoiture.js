import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';


function ModifVoiture() {
const location = useLocation();
const { id } = useParams();
const navigate = useNavigate();

const voiture = location.state;

//Initialiser data avec les valeurs de base
const [formData, setFormData] = useState({
    modele: voiture.modele,
    prix: voiture.prix,
    description: voiture.description,
    image: voiture.images,
    date: voiture.date,
    proprietaire: voiture.proprietaire
});

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
};

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch(`http://localhost:3000/api/voitures/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const updated = await response.json();
            console.log("Voiture mise à jour: ", updated);
            navigate('/');
        } else {
            const err = await response.json();
            alert(`Erreur : ${err.message}`);
        }
    } catch(error) {
        console.error('Erreur lors de la mise a jour :', error);
        alert('Une erreur est survenue');
    }
};


return (
<div>
    <h1>Modifier la {voiture.modele} de {voiture.proprietaire}</h1>
    <form onSubmit={handleSubmit}>
        <input type = "text" name = "modele" value = {formData.modele} onChange={handleChange} required/>
        <input type = "text" name = "prix" value = {formData.prix} onChange={handleChange} required/>
        <input type = "text" name = "description" value = {formData.description} onChange={handleChange} required/>
        <input type = "text" name = "image" value = {formData.image} onChange={handleChange} required/>
        <input type = "text" name = "date" value = {formData.date} onChange={handleChange} required/>
        <input type = "text" name = "proprietaire" value = {formData.proprietaire} onChange={handleChange} required/>
        <button type = "submit">Mettre à jour le véhicule</button>
    </form>
</div>
);
};

export default ModifVoiture;