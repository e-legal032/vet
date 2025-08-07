import { Link } from 'react-router-dom'
import Layout from '../components/Layout'

const Home = () => {
  return (
    <section className="home">
      <h1>Agenda tu turno veterinario</h1>
      <p>Esta plataforma te permite registrar tus datos y elegir una fecha para tu consulta.</p>
      
      <ul>
        <li>🐾 Registro del cliente</li>
        <li>📅 Selección de fecha</li>
        <li>✅ Confirmación narrativa del turno</li>
      </ul>

      <Link to="/reserva" className="cta">
        Iniciar reserva
      </Link>
    </section>
   
  )
}

export default Home
