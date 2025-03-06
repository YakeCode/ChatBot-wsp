import { google } from 'googleapis';
import config from '../../../config/env.js';

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

class GoogleCalendarClient {

  async  getNextEvent(calendarId = 'primary') {
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

  async logNextEvent() {
    try {

      const credentials = {
        type: config.GOOGLE_CALENDAR.TYPE,
        private_key: config.GOOGLE_CALENDAR.PRIVATE_KEY,
        client_email: config.GOOGLE_CALENDAR.CLIENT_EMAIL,
        client_id: config.GOOGLE_CALENDAR.CLIENT_ID,
      };

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

  async createEvent(eventData) {
    try {
      const response = await this.calendarAPI.events.insert({
        calendarId: this.calendarId,
        resource: eventData
      });
      console.log('Evento creado exitosamente:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error al crear el evento:', error);
      throw error;
    }
  }

  async deleteEvent(eventId) {
    try {
      const response = await this.calendarAPI.events.delete({
        calendarId: this.calendarId,
        eventId
      });
      console.log('Evento eliminado exitosamente');
      return response.data;
    } catch (error) {
      console.error('Error al eliminar el evento:', error);
      throw error;
    }
  }

}

export default new  GoogleCalendarClient();










/** Clase cliente para interactuar con Google Calendar API */

//class GoogleCalendarClient {
  /**
   * Crea una instancia del cliente de Google Calendar
   * @param {Object} options - Configuración necesaria para la autenticación
   * @param {string} options.calendarId - ID del calendario a utilizar (por defecto 'primary')
   */
  /*
  constructor({ calendarId = 'primary' }) {
    this.calendarId = calendarId;
    this.auth = getAuthClient();
    this.calendarAPI = google.calendar({ version: 'v3', auth: this.auth });
  }

  async getNextEvent() {
    try {
      const response = await this.calendarAPI.events.list({
        calendarId: this.calendarId,
        timeMin: new Date().toISOString(),
        maxResults: 1,
        singleEvents: true,
        orderBy: 'startTime'
      });
      const events = response.data.items;
      return events && events.length > 0 ? events[0] : null;
    } catch (error) {
      console.error('Error al obtener el próximo evento:', error);
      throw error;
    }
  }

  async listUpcomingEvents(maxResults = 10) {
    try {
      const response = await this.calendarAPI.events.list({
        calendarId: this.calendarId,
        timeMin: new Date().toISOString(),
        maxResults,
        singleEvents: true,
        orderBy: 'startTime'
      });
      return response.data.items;
    } catch (error) {
      console.error('Error al listar eventos próximos:', error);
      throw error;
    }
  }



  async updateEvent(eventId, eventData) {
    try {
      const response = await this.calendarAPI.events.update({
        calendarId: this.calendarId,
        eventId,
        resource: eventData
      });
      console.log('Evento actualizado exitosamente:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar el evento:', error);
      throw error;
    }
  }


}

export { GoogleCalendarClient };

*/



// Ejecutar la función











/**
 * Función principal para añadir un evento al calendario.
 * @param {Object} eventData - Datos del evento a crear.
 * @returns {Promise<string>} Mensaje de resultado.
 */
/*
const addEventToCalendar = async (eventData) => {
  try {
    const calendarClient = new GoogleCalendarClient({
      calendarId: config.GOOGLE_CALENDAR.CALENDAR_ID || 'primary'
    });
    await calendarClient.createEvent(eventData);
    return 'Evento creado exitosamente';
  } catch (error) {
    console.error('Error al añadir el evento al calendario:', error);
    return 'Error al crear el evento';
  }
};

export default addEventToCalendar;
*/
