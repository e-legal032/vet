//src/components/TurnoForm.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { esquemaTurno } from '../utils/validacionZod'
import { insertTurno } from '../supabase/turnos'
import { bloquesHorarios } from '../utils/horarios'

const TurnoForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    motivo: '',
    fecha: '',
    hora: '',
  })
  const [errores, setErrores] = useState({})
  const navigate = useNavigate()

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()

   const fechaCompleta = `${formData.fecha}T${formData.hora}:00`

   const validacion = esquemaTurno.safeParse({
      ...formData,
      fecha: fechaCompleta
    })

    console.log("Resultado de validación Zod:", validacion)
    if (!validacion.success) {
      const nuevosErrores = {}
      // 🧪 Corrección: Zod usa .issues, no .errors
      validacion.error?.issues?.forEach(err => {
        nuevosErrores[err.path[0]] = err.message
      })
      setErrores(nuevosErrores)
      console.log("Errores detectados:", nuevosErrores)
      return
    }
    console.log("✅ Validación exitosa, procediendo a insertar turno")


    const { error } = await insertTurno({
      ...formData,
      fecha: fechaCompleta // 🧪 reemplazamos fecha por timestamp completo
    })

    if (error) {
      console.error('Error al guardar turno:', error)
      return
    }
    console.log("✅ Turno guardado correctamente, navegando a confirmación")
    navigate('/confirmacion')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={formData.nombre}
        onChange={handleChange}
      />
      {errores.nombre && <p>{errores.nombre}</p>}

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      {errores.email && <p>{errores.email}</p>}

      <textarea
        name="motivo"
        placeholder="Motivo de consulta"
        value={formData.motivo}
        onChange={handleChange}
      />
      {errores.motivo && <p>{errores.motivo}</p>}

      <input
        type="date"
        name="fecha"
        value={formData.fecha}
        onChange={handleChange}
      />
      {errores.fecha && <p>{errores.fecha}</p>}

      <label>
        Horario del turno:
        <select
          name="hora"
          value={formData.hora}
          onChange={handleChange}
          required
        >
          <option value="">Seleccioná un horario</option>
          {bloquesHorarios.map(hora => (
            <option key={hora} value={hora}>
              {hora}
            </option>
          ))}
        </select>
      </label>
      {errores.hora && <p>{errores.hora}</p>}

      <button type="submit">Reservar turno</button>
    </form>
  )
}

export default TurnoForm
