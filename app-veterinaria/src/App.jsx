import { useEffect } from 'react'
import { supabase } from './supabase/client'

function App() {
  useEffect(() => {
    const validarConexion = async () => {
      const { data, error } = await supabase.from('clientes').select('*').limit(1)

      if (error) {
        console.error('❌ Falló conexión:', error.message)
      } else {
        console.log('✅ Conexión ok — muestra de datos:', data)
      }
    }

    validarConexion()
  }, [])

  return <h1>🌐 Validando conexión con Supabase...</h1>
}

export default App
