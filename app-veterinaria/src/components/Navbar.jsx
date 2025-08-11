// src/components/Navbar.jsx
import { Link } from 'react-router-dom'
//import './Navbar.css' // Opcional, si querés estilos separados

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/reserva">🐾 Reservá tu turno</Link>
        </li>
        <li>
          <Link to="/consulta">💬 Hacé una consulta</Link> {/* Ruta futura */}
        </li>
        <li>
          <Link to="/dashboard">🛠️ Panel Administrador</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
