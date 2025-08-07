import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
      <header>
        <h1>Veterinaria Z</h1>
        {/* Podés sumar tu barra de navegación modular acá */}
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
