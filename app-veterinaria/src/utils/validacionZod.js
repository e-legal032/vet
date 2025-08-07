// utils/validacionZod.js
import { z } from 'zod'

export const esquemaTurno = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  email: z.string().email("Formato de email no válido"),
  motivo: z.string().min(1, "Motivo requerido"),
  hora: z.string().min(1, "Horario requerido").regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Formato de hora no válido"),
  fecha: z.string().min(1, "Fecha requerida").regex(
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/,
    "Formato de fecha y hora no válido"
  )
})

