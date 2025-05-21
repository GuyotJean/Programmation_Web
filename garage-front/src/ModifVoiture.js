import { useLocation, useParams } from 'react-router-dom';


function ModifVoiture() {

const location = useLocation();
const { id } = useParams();
const voiture = location.state;

console.log('voiture', voiture);

return (
<div>
    <h1>Modifier la {voiture.modele} de {voiture.proprietaire}</h1>
    <form>
        <input type = "text" name = "modele" placeholder={voiture.modele} required/>
        <input type = "text" name = "prix" placeholder={voiture.prix} required/>
        <input type = "text" name = "description" placeholder = {voiture.description} required/>
        <input type = "text" name = "image" placeholder={voiture.image} required/>
        <input type = "text" name = "date" placeholder={voiture.date} required/>
        <input type = "text" name = "proprietaire" placeholder ={voiture.proprietaire} required/>
        <button type = "submit">Ajouter</button>
    </form>
</div>
);
};

export default ModifVoiture;