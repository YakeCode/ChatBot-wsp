import express from 'express';
import dotenv from 'dotenv';
import { google } from 'googleapis';
import config from '../../../config/env.js';

dotenv.config();

const app = express();
const PORT = config.PORT || 3050;

/**
 * Configura el cliente OAuth2 utilizando las credenciales de service account
 * @returns {OAuth2Client}
 */
function getAuthClient() {
  // Crear objeto de credenciales para la service account desde la configuración
  const credentials = {
    type: config.GOOGLE_CALENDAR.TYPE,
    project_id: config.GOOGLE_CALENDAR.PROJECT_ID,
    private_key_id: config.GOOGLE_CALENDAR.PRIVATE_KEY_ID,
    private_key: config.GOOGLE_CALENDAR.PRIVATE_KEY,
    client_email: config.GOOGLE_CALENDAR.CLIENT_EMAIL,
    client_id: config.GOOGLE_CALENDAR.CLIENT_ID,
    auth_uri: config.GOOGLE_CALENDAR.AUTH_URI,
    token_uri: config.GOOGLE_CALENDAR.TOKEN_URI,
    auth_provider_x509_cert_url: config.GOOGLE_CALENDAR.AUTH_PROVIDER_CERT_URL,
    client_x509_cert_url: config.GOOGLE_CALENDAR.CLIENT_CERT_URL
  };

  // Crear y configurar el cliente JWT con las credenciales de la service account
  const auth = new google.auth.JWT(
    credentials.client_email,
    null,
    credentials.private_key,
    ['https://www.googleapis.com/auth/calendar.readonly']
  );

  return auth;
}

/**
 * Obtiene el próximo evento del calendario especificado.
 * @param {string} calendarId - ID del calendario (por defecto 'primary')
 * @returns {Promise<Object|null>} - Devuelve el evento o null si no hay eventos próximos.
 */
async function getNextEvent(calendarId = 'primary') {
  try {
    const auth = getAuthClient();
    const calendar = google.calendar({ version: 'v3', auth });

    const res = await calendar.events.list({
      calendarId: calendarId,
      timeMin: new Date().toISOString(),
      maxResults: 1,
      singleEvents: true,
      orderBy: 'startTime',
    });

    const events = res.data.items;

    if (!events || events.length === 0) {
      return null;
    }

    return events[0]; // Retorna el primer evento encontrado
  } catch (error) {
    console.error('Error al obtener eventos:', error);
    throw error;
  }
}

// Ruta para obtener el próximo evento del calendario
app.get('/next-event', async (req, res) => {
  try {
    const calendarId = req.query.calendarId || 'primary';
    const event = await getNextEvent(calendarId);

    if (!event) {
      return res.json({ message: 'No hay eventos próximos en el calendario.' });
    }

    const eventData = {
      summary: event.summary,
      start: event.start.dateTime || event.start.date,
      location: event.location || 'No especificada',
      description: event.description || 'Sin descripción',
    };

    res.json(eventData);
  } catch (error) {
    console.error('Error al obtener el evento:', error);
    res.status(500).json({ error: 'Error al obtener el próximo evento.' });
  }
});

// Ruta para listar los próximos eventos
app.get('/upcoming-events', async (req, res) => {
  try {
    const auth = getAuthClient();
    const calendar = google.calendar({ version: 'v3', auth });
    const calendarId = req.query.calendarId || 'primary';
    const maxResults = parseInt(req.query.max) || 10;

    const response = await calendar.events.list({
      calendarId: calendarId,
      timeMin: new Date().toISOString(),
      maxResults: maxResults,
      singleEvents: true,
      orderBy: 'startTime',
    });

    const events = response.data.items.map(event => ({
      id: event.id,
      summary: event.summary,
      start: event.start.dateTime || event.start.date,
      end: event.end.dateTime || event.end.date,
      location: event.location || 'No especificada',
      description: event.description || 'Sin descripción',
    }));

    res.json(events);
  } catch (error) {
    console.error('Error al obtener eventos:', error);
    res.status(500).json({ error: 'Error al obtener los próximos eventos.' });
  }
});

async function logNextEvent() {
  try {
    // Configurar cliente de autenticación
    const credentials = {
      type: config.GOOGLE_CALENDAR.TYPE,
      private_key: config.GOOGLE_CALENDAR.PRIVATE_KEY,
      client_email: config.GOOGLE_CALENDAR.CLIENT_EMAIL,
      client_id: config.GOOGLE_CALENDAR.CLIENT_ID,
    };

    // Crear cliente JWT
    const auth = new google.auth.JWT(
      credentials.client_email,
      null,
      credentials.private_key,
      ['https://www.googleapis.com/auth/calendar.readonly']
    );

    // Inicializar cliente de Calendar
    const calendar = google.calendar({ version: 'v3', auth });
    const calendarId = 'agaviria658@gmail.com';

    console.log(`Buscando próximo evento en: ${calendarId}`);

    // Obtener el próximo evento
    const response = await calendar.events.list({
      calendarId: calendarId,
      timeMin: new Date().toISOString(),
      maxResults: 1,
      singleEvents: true,
      orderBy: 'startTime',
    });

    const events = response.data.items;

    if (!events || events.length === 0) {
      console.log('No hay eventos próximos programados.');
      return;
    }

    // Extraer información del evento
    const event = events[0];
    console.log('✅ Próximo evento:');
    console.log(`Título: ${event.summary}`);
    console.log(`Inicio: ${event.start.dateTime || event.start.date}`);
    console.log(`Fin: ${event.end.dateTime || event.end.date}`);
    console.log(`Ubicación: ${event.location || 'No especificada'}`);

  } catch (error) {
    console.error('Error al obtener el evento:', error.message);
  }
}

// Ejecutar la función
logNextEvent();
// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
