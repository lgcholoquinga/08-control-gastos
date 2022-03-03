import { useState, useEffect } from 'react';
import cerrar from '../img/cerrar.svg';
import Mensaje from './Mensaje';

const Modal = ({
  setModal,
  animarModal,
  setAnimarModal,
  guardarGasto,
  gastoEditar,
  setGastoEditar,
}) => {
  const [tituloModal, setTituloModal] = useState('Nuevo Gasto');
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [categoria, setCategoria] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [id, setid] = useState('');

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setTituloModal('Editar Gasto');
      setNombre(gastoEditar.nombre);
      setCantidad(gastoEditar.cantidad);
      setCategoria(gastoEditar.categoria);
      setid(gastoEditar.id);
    }
  }, []);

  const cerrarModal = () => {
    setGastoEditar({});
    setAnimarModal(false);

    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const handleAgregarGasto = (e) => {
    e.preventDefault();

    if ([nombre, cantidad, categoria].includes('')) {
      setMensaje('Todos los campos son obligatorios.');
      return;
    }

    setMensaje('');
    guardarGasto({ nombre, cantidad, categoria, id });
    cerrarModal();
  };

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={cerrar} alt="cerrar modal" onClick={cerrarModal} />
      </div>

      <form
        className={`formulario ${animarModal ? 'animar' : 'cerrar'} `}
        onSubmit={handleAgregarGasto}
      >
        <legend>{tituloModal}</legend>
        <div className="campo">
          <label htmlFor="nombre">Nombre Gasto</label>
          {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
          <input
            id="nombre"
            type="text"
            placeholder="Agrega un nombre de gasto"
            autoComplete="false"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="campo">
          <label htmlFor="cantidad">Cantidad</label>
          <input
            id="cantidad"
            type="number"
            placeholder="Agrega la cantidad del gasto"
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
          />
        </div>

        <div className="campo">
          <label htmlFor="categoria">Categoria</label>
          <select
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">-- Seleccione --</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastos">Gastos Varios</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>

        <input
          type="submit"
          value={gastoEditar.nombre ? 'Guardar Cambios' : 'Agregar Gasto'}
        />
      </form>
    </div>
  );
};

export default Modal;
