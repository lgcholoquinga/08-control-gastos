import { useState } from 'react';
import Mensaje from './Mensaje';

const Presupuesto = ({
  presupuesto,
  setPresupuesto,
  setIsValidPresupuesto,
}) => {
  const [mensajeError, setMensajeError] = useState('');

  const handlePresupuesto = (e) => {
    e.preventDefault();

    if (!Number(presupuesto) || Number(presupuesto) < 0) {
      setMensajeError('No es un presupuesto valido');
      return;
    }

    setMensajeError('');
    setIsValidPresupuesto(true);
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra">
      <form className="formulario" onSubmit={handlePresupuesto}>
        <div className="campo">
          <label>Definir presupuesto</label>
          <input
            className="nuevo-presupuesto"
            type="number"
            placeholder="Agrega tu presupuesto"
            value={presupuesto}
            onChange={(e) => setPresupuesto(Number(e.target.value))}
          />
        </div>
        <input type="submit" value="Agregar" />

        {mensajeError && <Mensaje tipo="error">{mensajeError}</Mensaje>}
      </form>
    </div>
  );
};

export default Presupuesto;
