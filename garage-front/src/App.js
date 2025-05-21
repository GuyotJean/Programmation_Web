import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Accueil from './Accueil';
import AjoutVoiture from './AjoutVoiture';
import ModifVoiture from './ModifVoiture';

function App() {
    return (
        <Router>
        <Routes>
            <Route path="/" element={<Accueil />}></Route>
            <Route path="/ajouter" element={<AjoutVoiture />}/>
            <Route path="/modifier/:id" element={<ModifVoiture />}/>
        </Routes>
        </Router>
    )
}

export default App;