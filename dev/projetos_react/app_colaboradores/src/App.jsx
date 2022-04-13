import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css';

import Colaboradores from './Pages/colaboradores/colaboradores';

function App() {
  return (
    <div className="App">
      <Colaboradores />
    </div>
  );
}

export default App;
