// 📁 src/components/BotonWhatsApp.jsx

import PropTypes from "prop-types"; // 🧩 Importamos PropTypes para validar los props

export default function BotonWhatsApp({ mensaje }) {
  // 📞 Número fijo de la veterinaria en formato internacional para wa.me
  // 🔢 Se elimina el "15" y se antepone "54911" → CABA, Argentina
  const numero = "5491125809757"; // 🧩 Número definido directamente en el componente

  // 🔗 Construimos la URL de redirección con mensaje encodeado
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-block",
        padding: "0.75rem 1.5rem",
        backgroundColor: "#25D366", // ✅ Color oficial de WhatsApp
        color: "#fff",
        borderRadius: "5px",
        textDecoration: "none",
        fontWeight: "bold",
        marginTop: "2rem",
      }}
    >
      💬 Consultar por WhatsApp
    </a>
  );
}

// 🧪 Validación narrativa de props con PropTypes
BotonWhatsApp.propTypes = {
  mensaje: PropTypes.string.isRequired, // ✅ Debe ser string, obligatorio
};
