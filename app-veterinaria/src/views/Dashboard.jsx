// src/views/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { obtenerTurnos } from '../supabase/turnos';
import TurnoListado from '../components/TurnoListado';
import Layout from '../components/Layout';

const Dashboard = () => {
  const [turnos, setTurnos] = useState([]);

  useEffect(() => {
    const cargarTurnos = async () => {
      const { data, error } = await obtenerTurnos();
      if (error) {
        console.error('Error al obtener turnos:', error.message);
      } else {
        setTurnos(data);
      }
    };

    cargarTurnos();
  }, []);

  return (
    <Layout>
      <h1>Panel de turnos</h1>
      <TurnoListado turnos={turnos} />
    </Layout>
  );
};

export default Dashboard;
