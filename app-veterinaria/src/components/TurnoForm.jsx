import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { esquemaTurno } from '../utils/validacionZod'
import {
  insertTurno,
  obtenerVeterinarios,
  verificarDisponibilidad
} from '../supabase/turnos'
import { bloquesHorarios } from '../utils/horarios'

const TurnoForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    motivo: '',
    fecha: '',
    hora: '',
    veterinarioId: '',
  })
  const [modoReserva, setModoReserva] = useState('')
  const [errores, setErrores] = useState({})
  const [veterinarios, setVeterinarios] = useState([])
  const [horariosFiltrados, setHorariosFiltrados] = useState([])
  const navigate = useNavigate()

  // 🧪 Paso 2: cargar veterinarios desde Supabase al montar
  useEffect(() => {
    const cargarVeterinarios = async () => {
      const data = await obtenerVeterinarios()
      setVeterinarios(data)
    }
    cargarVeterinarios()
  }, [])

  // 🧪 Paso 3: filtrar horarios según día y veterinario
  useEffect(() => {
    if (modoReserva === 'profesional' && formData.veterinarioId && formData.fecha) {
      const diaSemana = new Date(formData.fecha).toLocaleDateString('es-AR', {
        weekday: 'long'
      }).toLowerCase()

      const vetSeleccionado = veterinarios.find(
        vet => String(vet.id) === formData.veterinarioId
      )

      const horarios = vetSeleccionado?.disponibilidad?.[diaSemana] || []
      setHorariosFiltrados(horarios)
    } else {
      setHorariosFiltrados([])
    }
  }, [formData.veterinarioId, formData.fecha, veterinarios, modoReserva])

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // 🧪 Paso 4: validar disponibilidad antes de guardar
  const handleSubmit = async e => {
    e.preventDefault()

    const fechaCompleta = `${formData.fecha}T${formData.hora}:00`

    // 🧪 Validación con Zod
    const validacion = esquemaTurno.safeParse({
      ...formData,
      fecha: fechaCompleta
    })

    if (!validacion.success) {
      const nuevosErrores = {}
      validacion.error?.issues?.forEach(err => {
        nuevosErrores[err.path[0]] = err.message
      })
      setErrores(nuevosErrores)
      return
    }

    // 🧪 Validación de disponibilidad solo si se reserva por profesional
    if (modoReserva === 'profesional') {
      const veterinarioIdValido = formData.veterinarioId?.trim()

      if (!veterinarioIdValido || veterinarioIdValido === 'NaN') {
        setErrores({ veterinarioId: 'Seleccioná un profesional válido.' })
        return
      }

      const { disponible, error: errorDisponibilidad } = await verificarDisponibilidad({
        fecha: fechaCompleta,
        veterinarioId: veterinarioIdValido
      })

      if (errorDisponibilidad) {
        console.error('Error al verificar disponibilidad:', errorDisponibilidad)
        return
      }

      if (!disponible) {
        setErrores({ hora: 'Este horario ya está reservado para este profesional.' })
        return
      }
    }

    // 🧪 Construcción segura del objeto para insertar
    const datosTurno = {
      nombre: formData.nombre,
      email: formData.email,
      motivo: formData.motivo,
      fecha: fechaCompleta,
      hora: formData.hora
    }

    // 🧪 Solo incluir veterinarioId si se reservó por profesional
    if (modoReserva === 'profesional') {
      datosTurno.veterinarioId = formData.veterinarioId
    }

    const { error } = await insertTurno(datosTurno)

    if (error) {
      console.error('Error al guardar turno:', error)
      return
    }

    navigate('/confirmacion')
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* 🧩 Datos del cliente */}
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

      {/* 🧩 Motivo de consulta */}
      <textarea
        name="motivo"
        placeholder="Motivo de consulta"
        value={formData.motivo}
        onChange={handleChange}
      />
      {errores.motivo && <p>{errores.motivo}</p>}

      {/* 🧩 Modo de reserva */}
      <label>
        ¿Cómo querés reservar?
        <select
          value={modoReserva}
          onChange={e => setModoReserva(e.target.value)}
          required
        >
          <option value="">Elegí una opción</option>
          <option value="profesional">Por profesional</option>
          <option value="horario">Por horario</option>
        </select>
      </label>

      {/* 🧩 Reserva por profesional */}
      {modoReserva === 'profesional' && (
        <>
          <label>
            Elegí profesional:
            <select
              name="veterinarioId"
              value={formData.veterinarioId}
              onChange={handleChange}
              required
            >
              <option value="">Seleccioná un profesional</option>
              {veterinarios.map(vet => (
                <option key={vet.id} value={String(vet.id)}>
                  {vet.nombre}
                </option>
              ))}
            </select>
          </label>
          {errores.veterinarioId && <p>{errores.veterinarioId}</p>}

          <input
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            required
          />
          {errores.fecha && <p>{errores.fecha}</p>}

          <label>
            Horario disponible:
            <select
              name="hora"
              value={formData.hora}
              onChange={handleChange}
              required
            >
              <option value="">Seleccioná un horario</option>
              {horariosFiltrados.map(hora => (
                <option key={hora} value={hora}>
                  {hora}
                </option>
              ))}
            </select>
          </label>
        </>
      )}

      {/* 🧩 Reserva por horario */}
      {modoReserva === 'horario' && (
        <>
          <input
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            required
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
        </>
      )}

      {errores.hora && <p>{errores.hora}</p>}

      {/* 🧩 Acción final */}
      <button type="submit">Reservar turno</button>
    </form>
  )
}

export default TurnoForm
