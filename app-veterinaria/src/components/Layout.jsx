import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const Layout = () => {
  return (
    <>
      <header>
        <h1>Veterinaria Z</h1>
        <Navbar />
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <p>© 2025 anaSposito para Veterinaria Z - Todos los derechos reservados</p>
      </footer>
    </>
  )
}

export default Layout
