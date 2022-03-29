import { useState } from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import UsuarioList from './UsuarioList';
import UsuarioForm from './UsuarioForm';

function App() {
  const initialState = { id: null, nome: '', email: '', celular: '' };
  const [usuarios, setUsuarios] = useState([]);

  const [usuario, setUsuario] = useState(initialState);
  const [editando, setEditando] = useState(false);

  const inserir = () => {
    setUsuario(initialState);
    setEditando(true);
  };

  const salvar = () => {
    console.log('Salvar ...');
    if (usuario.id === null) {
      // inclussão
      usuario.id = usuarios.length + 1;
      setUsuarios([...usuarios, usuario]);
    } else {
      // alteração
      setUsuarios(usuarios.map((find) => (find.id === usuario.id ? usuario : find)));
    }
    setEditando(false);
  };

  const cancelar = () => {
    console.log('Cancelou ...');
    setEditando(false);
  };

  const editar = (id) => {
    setUsuario(usuarios.filter((usuario) => usuario.id === id)[0]);
    setEditando(true);
  };
  const excluir = (id) => {
    setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
  };

  const onClickAtualizar = () => {
    let usuariosList = [
      { id: 1, nome: 'fulano', email: 'teste@upf.com', idade: 30 },
      { id: 2, nome: 'beltrano', email: 'beltrano@upf.br', idade: 20 },
      { id: 3, nome: 'ciclano', email: 'ciclano@upf.br', idade: 30 },
    ];

    setUsuarios(usuariosList);
  };

  if (!editando) {
    return (
      <div className="App">
        <UsuarioList
          usuarios={usuarios}
          onClickAtualizar={onClickAtualizar}
          inserir={inserir}
          editar={editar}
          excluir={excluir}
        />
      </div>
    );
  } else {
    return (
      <div className="App">
        <UsuarioForm usuario={usuario} setUsuario={setUsuario} salvar={salvar} cancelar={cancelar} />
      </div>
    );
  }
}

export default App;
