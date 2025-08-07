import { Link } from 'react-router-dom';

const TurnoConfirmacion = () => {
  return (
    <section>
      <h2>✅ ¡Turno registrado con éxito!</h2>
      <p>Gracias por confiar en Veterinaria Z. Tu solicitud fue enviada correctamente.</p>

      <nav>
        <Link to="/">Volver al inicio</Link>
        <Link to="/reserva">Solicitar otro turno</Link>
      </nav>
    </section>
  );
};

export default TurnoConfirmacion;
