// src/components/TurnoListado.jsx
import React from 'react';

const TurnoListado = ({ turnos }) => {
  if (!turnos || turnos.length === 0) {
    return <p>No hay turnos registrados.</p>;
  }

  return (
    <div>
      <h2>Turnos próximos</h2>
      <ul>
        {turnos.map((turno) => (
          <li key={turno.id}>
            <strong>{turno.nombre}</strong> — {turno.motivo} <br />
            📅 {turno.fecha} 🕒 {turno.hora}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TurnoListado;
