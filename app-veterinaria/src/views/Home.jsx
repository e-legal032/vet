import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <section className="home">
      <h1>Bienvenida a la app de turnos veterinarios 🐶🐱</h1>
      <p>
        Esta plataforma te permite reservar turnos para tus mascotas de forma rápida y segura.
      </p>

      <p>
        Si ya sos cliente, podés iniciar el proceso de reserva con un solo clic.
      </p>

      <Link to="/reserva" className="cta">
        🐾 Quiero reservar un turno
      </Link>
    </section>
  )
}

export default Home
