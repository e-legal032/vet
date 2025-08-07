import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './views/Home'
import Reserva from './views/Reserva'
import TurnoConfirmacion from './components/TurnoConfirmacion'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='reserva' element={<Reserva />} />
        <Route path="confirmacion" element={<TurnoConfirmacion />} />

        {/* Más rutas */}
      </Route>
    </Routes>
  )
}

export default App
