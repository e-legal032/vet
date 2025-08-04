# 🐾 App de Reservas Veterinarias

💡 Proyecto de gestión de turnos veterinarios con foco editorial, desarrollada en React + Supabase.  
Arquitectura mínima, desacoplada y documentada como patrón replicable para futuras apps temáticas.

---

## 🚀 Enlace en vivo
[🔗 Ver la app desplegada en Netlify](https://TU-URL-AQUÍ.netlify.app)

---

## 🧬 Estructura técnica

src/ ├─ components/ → UI modular y desacoplada
     ├─ views/ → Narrativa editorial por rol 
     ├─ supabase/ → Lógica de conexión y operaciones CRUD
     ├─ utils/ → Validaciones y funciones auxiliares
     ├─ App.jsx → Configuración de rutas/vistas
     └─ main.jsx → Punto de entrada

    
Supabase:  
- `clientes`: datos del usuario  
- `turnos`: reservas con estado  
- `veterinarios`: disponibilidad y atención  

---

## ✍️ Propósito narrativo

Esta app busca facilitar reservas veterinarias con control editorial, estructura clara y experiencia diferenciada según rol (cliente vs. profesional). Cada componente está documentado como parte de un sistema curatorial replicable.

---

## 📚 Changelog curatorial

- `2025-08-04`: Inicio del proyecto y README estructural
- `...`: Documentar aquí cada avance técnico y curatorial

---

## 👩‍💻 Créditos

- Desarrollo, diseño y curaduría: **anaSposito**
- Librerías: Vite, React, Supabase, Zod
- Asistencia técnica: **Copilot**

---

## ⚖️ Licencia

Este proyecto se distribuye bajo la Licencia MIT.  



