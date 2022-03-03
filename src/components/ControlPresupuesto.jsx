import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ControlPresupuesto = ({
  presupuesto,
  gastos,
  setGastos,
  setPresupuesto,
  setIsValidPresupuesto,
}) => {
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);

  useEffect(() => {
    const totalGastado = gastos.reduce(
      (total, gasto) => gasto.cantidad + total,
      0
    );
    const totalDisponible = presupuesto - totalGastado;

    // calcular el porcentaje gastado
    const nuevoPorcentaje = (
      ((presupuesto - totalDisponible) / presupuesto) *
      100
    ).toFixed(2);

    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje);
    }, 1000);

    setGastado(totalGastado);
    setDisponible(totalDisponible);
  }, [gastos]);

  const formatearCantidad = (cantidad) => {
    return cantidad.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };

  const handleResetearApp = () => {
    const respuesta = confirm('Quieres reiniciar la aplicacion?');
    if (respuesta) {
      setIsValidPresupuesto(false);
      setGastos([]);
      setPresupuesto(0);
      localStorage.removeItem('presupuesto');
      localStorage.removeItem('gastos');
    }
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: porcentaje > 100 ? '#DC2626' : '#0277bd',
            textColor: porcentaje > 100 ? '#DC2626' : '#0277bd',
          })}
          value={porcentaje}
          text={`${porcentaje}%: Gastado`}
        />
      </div>
      <div className="contenido-presupuesto">
        <button className="reset-app" onClick={handleResetearApp}>
          Reiniciar Aplicacion
        </button>
        <p>
          <span>Presupuesto: </span>
          {formatearCantidad(presupuesto)}
        </p>

        <p className={`${disponible < 0 ? 'negativo' : ''}`}>
          <span>Disponible: </span>
          {formatearCantidad(disponible)}
        </p>

        <p>
          <span>Gastado: </span>
          {formatearCantidad(gastado)}
        </p>
      </div>
    </div>
  );
};

export default ControlPresupuesto;
