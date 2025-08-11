import { useState } from "react";
import FormularioConsulta from "../components/FormularioConsulta";
import BotonWhatsApp from "../components/BotonWhatsApp";
import { insertarConsulta } from "../supabase/insertarConsulta"; // 🧩 Importamos la función modular de inserción

export default function Consulta() {
  const [nombre, setNombre] = useState("");
  const [contacto, setContacto] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // 🛑 Evitamos el comportamiento por defecto del formulario
    setError("");       // 🧼 Limpiamos errores previos
    setEnviado(false);  // 🔄 Reiniciamos estado de envío

    // 🧪 Validación mínima antes de enviar
    if (!nombre.trim()) return setError("Por favor ingresá tu nombre.");
    if (!contacto.trim()) return setError("Ingresá un email o teléfono válido.");
    if (!mensaje.trim()) return setError("Escribí tu consulta.");

    // 📤 Enviamos los datos usando el módulo curatorial
    const resultado = await insertarConsulta({ nombre, contacto, mensaje });

    if (!resultado.ok) {
      // ❌ Si hay error, lo mostramos y registramos detalles en consola
      setError(resultado.error);
      console.error("Detalles:", resultado.detalles);
      return;
    }

    // ✅ Si todo salió bien, actualizamos estado y limpiamos campos
    setEnviado(true);
    setNombre("");
    setContacto("");
    setMensaje("");
  };

  return (
    <section style={{ maxWidth: "600px", margin: "0 auto", padding: "2rem" }}>
      <h2>¿Tenés una consulta sobre tu mascota?</h2>
      <p>Elegí cómo querés comunicarte con nosotros.</p>

      <FormularioConsulta
        nombre={nombre}
        contacto={contacto}
        mensaje={mensaje}
        error={error}
        enviado={enviado}
        setNombre={setNombre}
        setContacto={setContacto}
        setMensaje={setMensaje}
        handleSubmit={handleSubmit}
      />

      <BotonWhatsApp
        //numero="549XXXXXXXXXX" nro destinatario hardcodeado en BotonWhatsApp.jsx
        mensaje="Hola, quiero hacer una consulta sobre mi mascota"
      />
    </section>
  );
}
