/* REACT */
import { useState, useEffect } from 'react';

/* COMPONENTS */
import Header from './components/Header';
import Modal from './components/Modal';
import ListadoGastos from './components/ListadoGastos';

/* ICONOS */
import iconoNuevoGasto from './img/nuevo-gasto.svg';

/* HELPERS */
import { generarId } from './helpers/Index';
import Filtros from './components/Filtros';

function App() {
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos')
      ? JSON.parse(localStorage.getItem('gastos'))
      : []
  );
  const [gastoEditar, setGastoEditar] = useState({});

  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true);

      setTimeout(() => {
        setAnimarModal(true);
      }, 500);
    }
  }, [gastoEditar]);

  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto);
  }, [presupuesto]);

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? []);
  }, [gastos]);

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto') ?? 0);
    if (presupuestoLS > 0) {
      setIsValidPresupuesto(true);
    }
  }, []);

  useEffect(() => {
    if (filtro) {
      const gastosFiltra = gastos.filter((gsto) => gsto.categoria === filtro);
      setGastosFiltrados(gastosFiltra);
    }
  }, [filtro]);

  const handleNuevoGasto = () => {
    setGastoEditar({});
    setModal(true);

    setTimeout(() => {
      setAnimarModal(true);
    }, 500);
  };

  const guardarGasto = (gasto) => {
    if (gasto.id) {
      gasto.fecha = Date.now();
      const gastosActualizados = gastos.map((gsto) => {
        if (gsto.id === gasto.id) {
          return gasto;
        }
        return gsto;
      });
      setGastos(gastosActualizados);
      setGastoEditar({});
      return;
    }

    gasto.id = generarId();
    gasto.fecha = Date.now();
    setGastos([...gastos, gasto]);
  };

  const eliminarGasto = (id) => {
    const listadoGastos = gastos.filter((gasto) => gasto.id !== id);
    setGastos(listadoGastos);
  };

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        gastos={gastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        setGastos={setGastos}
      />

      {isValidPresupuesto && (
        <>
          <main>
            {gastos.length > 0 ? (
              <Filtros filtro={filtro} setFiltro={setFiltro} />
            ) : null}
            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>
          <div className="nuevo-gasto" onClick={handleNuevoGasto}>
            <img src={iconoNuevoGasto} alt="Icono nuevo gasto" />
          </div>
        </>
      )}

      {modal && (
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      )}
    </div>
  );
}

export default App;
