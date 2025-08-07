// supabase/turnos.js
import  supabase  from './client.js'

export async function insertTurno(formData) {
  const { nombre, email, motivo, fecha } = formData

  // Paso 1: Buscar cliente por email
  const { data: clienteExistente, error: errorBuscar } = await supabase
    .from('clientes')
    .select('id')
    .eq('email', email)
    .single()

  if (errorBuscar && errorBuscar.code !== 'PGRST116') {
    console.error('Error al buscar cliente:', errorBuscar)
    return { error: errorBuscar }
  }

  let clienteId

  if (clienteExistente) {
    clienteId = clienteExistente.id
  } else {
    // Paso 2: Crear cliente
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

  // Paso 3: Insertar turno con cliente_id
  const turno = {
    cliente_id: clienteId,
    motivo,
    fecha,
    estado: 'pendiente'
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
// 🆕 Nueva función: obtener turnos con datos del cliente
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

  // Transformación opcional: aplanar estructura
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