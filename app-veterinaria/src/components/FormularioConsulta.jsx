// src/components/FormularioConsulta.jsx
import PropTypes from "prop-types"; // 🧩 Importamos PropTypes para validar los props

export default function FormularioConsulta({
  nombre,         // string: valor del campo "Nombre"
  contacto,       // string: valor del campo "Email o teléfono"
  mensaje,        // string: valor del campo "Consulta"
  error,          // string (opcional): mensaje de error
  enviado,        // boolean: estado de envío exitoso
  setNombre,      // function: actualiza el estado "nombre"
  setContacto,    // function: actualiza el estado "contacto"
  setMensaje,     // function: actualiza el estado "mensaje"
  handleSubmit,   // function: maneja el envío del formulario
}) {
  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
      <label>
        Nombre:
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Email o teléfono:
        <input
          type="text"
          value={contacto}
          onChange={(e) => setContacto(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Consulta:
        <textarea
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          required
        />
      </label>
      <br />
      <button type="submit">Enviar consulta</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {enviado && <p style={{ color: "green" }}>Consulta enviada con éxito.</p>}
    </form>
  );
}

// 🧪 Validación narrativa de props con PropTypes
FormularioConsulta.propTypes = {
  nombre: PropTypes.string.isRequired,       // ✅ Campo de texto obligatorio
  contacto: PropTypes.string.isRequired,     // ✅ Campo de texto obligatorio
  mensaje: PropTypes.string.isRequired,      // ✅ Campo de texto obligatorio
  error: PropTypes.string,                   // 🟡 Opcional: mensaje de error
  enviado: PropTypes.bool.isRequired,        // ✅ Estado booleano obligatorio
  setNombre: PropTypes.func.isRequired,      // ✅ Función para actualizar "nombre"
  setContacto: PropTypes.func.isRequired,    // ✅ Función para actualizar "contacto"
  setMensaje: PropTypes.func.isRequired,     // ✅ Función para actualizar "mensaje"
  handleSubmit: PropTypes.func.isRequired,   // ✅ Función para manejar el submit
};
