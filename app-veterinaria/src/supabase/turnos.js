import supabase from './client.js'

export async function insertTurno(formData) {
  const { nombre, email, motivo, fecha, veterinarioId } = formData

  // 🧩 Paso 1: Buscar cliente por email
  const { data: clienteExistente, error: errorBuscar } = await supabase
    .from('clientes')
    .select('id')
    .eq('email', email)
    .single()

  // 🧪 Validación curatorial: ignorar error de "no encontrado" (PGRST116)
  if (errorBuscar && errorBuscar.code !== 'PGRST116') {
    console.error('Error al buscar cliente:', errorBuscar)
    return { error: errorBuscar }
  }

  let clienteId

  if (clienteExistente) {
    clienteId = clienteExistente.id
  } else {
    // 🧩 Paso 2: Crear cliente si no existe
    const { data: nuevoCliente, error: errorCrear } = await supabase
      .from('clientes')
      .insert([{ nombre, email }])
      .select('id')
      .single()

    if (errorCrear) {
      console.error('Error al crear cliente:', errorCrear)
      return { error: errorCrear }
    }

    clienteId = nuevoCliente.id
  }

  // 🧩 Paso 3: Insertar turno con cliente_id y veterinarioId
  const turno = {
    cliente_id: clienteId,
    motivo,
    fecha,
    estado: 'pendiente',
    veterinario_id: veterinarioId
  }

  const { data, error } = await supabase
    .from('turnos')
    .insert([turno])

  if (error) {
    console.error('Error al registrar turno:', error)
    return { error }
  }

  return { data }
}

// 🆕 Obtener turnos con datos del cliente
export async function obtenerTurnos() {
  const { data, error } = await supabase
    .from('turnos')
    .select(`
      id,
      motivo,
      fecha,
      estado,
      clientes (
        nombre,
        email
      )
    `)
    .order('fecha', { ascending: true })

  if (error) {
    console.error('Error al obtener turnos:', error)
    return { error }
  }

  // 🧩 Transformación opcional: aplanar estructura
  const turnos = data.map((turno) => ({
    id: turno.id,
    motivo: turno.motivo,
    fecha: turno.fecha,
    estado: turno.estado,
    nombre: turno.clientes?.nombre || 'Sin nombre',
    email: turno.clientes?.email || 'Sin email'
  }))

  return { data: turnos }
}

// 🆕 Obtener veterinarios con disponibilidad
export async function obtenerVeterinarios() {
  const { data, error } = await supabase
    .from('veterinarios')
    .select('id, nombre, disponibilidad')

  if (error) {
    console.error('Error al obtener veterinarios:', error)
    return []
  }

  return data
}

// 🆕 Paso 4: Verificar si el turno ya está reservado
export async function verificarDisponibilidad({ fecha, veterinarioId }) {
  // 🧪 Fix curatorial: casteo explícito de veterinarioId a número
  //const idNumerico = Number(veterinarioId)

  const { data, error } = await supabase
    .from('turnos')
    .select('id')
    .eq('fecha', fecha)
    .eq('veterinario_id', veterinarioId)

  if (error) {
    // 🧪 Mejora en logging: mostrar estructura completa del error
    console.error('Error al verificar disponibilidad:', JSON.stringify(error, null, 2))
    return { disponible: false, error }
  }

  return { disponible: data.length === 0 }
}
