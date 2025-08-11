import { esquemaConsulta } from '../utils/validacionZod'
import supabase from './client.js' // ✅ Usás la instancia única


export async function insertarConsulta(datos) {
  const resultado = esquemaConsulta.safeParse(datos)

  if (!resultado.success) {
    return {
      ok: false,
      error: 'Datos inválidos',
      detalles: resultado.error.flatten().fieldErrors
    }
  }

  const { nombre, contacto, mensaje } = resultado.data
  const fecha_envio = new Date().toISOString(); // ✅ Timestamp definido

  const { error } = await supabase
    .from('consultas')
    .insert([{ nombre, email: contacto, mensaje, fecha_envio }]) // 'contacto' se mapea como 'email'

  if (error) {
    return {
      ok: false,
      error: 'Error al insertar en Supabase',
      detalles: error.message
    }
  }

  return { ok: true }
}
