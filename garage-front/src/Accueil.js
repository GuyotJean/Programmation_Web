import './Accueil.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Accueil() {
  const [voitures, setVoitures] = useState([]);

  //Liste les voitures au démarrage
  useEffect(() => {
    fetch('/api/voitures')
    .then(res => res.json())
    .then(data => setVoitures(data))
    .catch(err => console.error('Erreur:', err),);
  }, []);

  //Méthode pour supprimer une voiture
  const supprimerVoiture = (id) => {
    if(!window.confirm("Voulez-vous supprimer cette voiture ?")) return;

    fetch(`/api/voitures/${id}`, {
      method: 'DELETE',
    })
    .then(res => {
      if(!res.ok) throw new Error('Erreur lors de la suppression');
      return res.json();
    })
    .then(() => {
      setVoitures(prev => prev.filter(v => v.id !== id));
    })
    .catch(err => {
      console.error('Erreur de suppression :', err);
      alert("Échec de la suppression");
    });
  };

  return (
<div>
  <h1 id="h1-Card">Listes des cartes disponible :</h1>
  <Link to="/ajouter"><button>Ajouter une voiture</button></Link>
  <div className="voiture-grid">
    {voitures.map(voiture => (
      <div key={voiture.id} className="voiture-card">
        <h2>{voiture.marque} - {voiture.modele}</h2>
        
        <p><strong>Prix :</strong> {voiture.prix}$</p>
        <p><strong>Description :</strong> {voiture.description}</p>
        <p><strong>Propriétaire :</strong> {voiture.proprietaire}</p>

        <span
        className="delete-icon"
        title="Supprimer"
        onClick={() => supprimerVoiture(voiture.id)}
        >
          🗑️
        </span>
    
       <Link to={`/modifier/${voiture.id}`} state={voiture}>
        <button className="modifyBtn"> Modifier</button>
        </Link>

      </div>
    ))}
  </div>
</div>
  );
}

export default Accueil;
