import config from '../config/env.js';

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

class CalendarController {

  async  nextEvent (req, res) {
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
  }


  async upcomingEvents (req, res){
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
  }
}

export default new  CalendarController();



