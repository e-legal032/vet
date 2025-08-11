import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './views/Home'
import Reserva from './views/Reserva'
import Dashboard from './views/Dashboard'
import Consulta from './views/Consulta' // ✅ Nueva vista conectada
import TurnoConfirmacion from './components/TurnoConfirmacion'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='reserva' element={<Reserva />} />
        <Route path='confirmacion' element={<TurnoConfirmacion />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='consulta' element={<Consulta />} /> {/* ✅ Nueva ruta */}

        {/* Más rutas */}
      </Route>
    </Routes>
  )
}

export default App
