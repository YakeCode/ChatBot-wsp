import { google } from 'googleapis';
import config from '../../../config/env.js';

/** Clase cliente para interactuar con Google Sheets API */
class GoogleSheetsClient {
  /**
   * Crea una instancia del cliente de Google Sheets
   * @param {Object} config - Configuración necesaria para la autenticación
   * @param {string} config.clientEmail - Email del cliente de servicio
   * @param {string} config.privateKey - Llave privada del cliente
   * @param {string} config.spreadsheetId - ID del documento de Google Sheets
   */
  constructor({ clientEmail, privateKey, spreadsheetId }) {
    // Configurar autenticación JWT
    this.auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    this.spreadsheetId = spreadsheetId;
    this.sheetsAPI = google.sheets('v4');
  }

  /**
   * Verifica y crea una hoja si no existe
   * @param {string} sheetName - Nombre de la hoja a verificar/crear
   * @returns {Promise<boolean>} - True si la hoja está lista
   */
  async verifyOrCreateSheet(sheetName) {
    try {
      const { data } = await this.sheetsAPI.spreadsheets.get({
        spreadsheetId: this.spreadsheetId,
        auth: this.auth
      });

      const sheetExists = data.sheets.some(
        sheet => sheet.properties.title === sheetName
      );

      if (!sheetExists) {
        await this.createSheet(sheetName);
        console.log(`Hoja '${sheetName}' creada exitosamente`);
      } else {
        console.log(`La hoja '${sheetName}' ya existe`);
      }
      return true;
    } catch (error) {
      console.error("Error al verificar/crear la hoja:", error);
      return false;
    }
  }

  /**
   * Crea una nueva hoja en el documento
   * @param {string} sheetName - Nombre de la hoja a crear
   */
  async createSheet(sheetName) {
    await this.sheetsAPI.spreadsheets.batchUpdate({
      spreadsheetId: this.spreadsheetId,
      resource: {
        requests: [{
          addSheet: {
            properties: { title: sheetName }
          }
        }]
      },
      auth: this.auth
    });
  }

  /**
   * Añade una fila de datos a la hoja especificada
   * @param {string} sheetName - Nombre de la hoja de destino
   * @param {Array} rowData - Datos a insertar en formato de array
   * @returns {Promise<Object>} Respuesta de la API
   */
  async appendRow(sheetName, rowData) {
    try {
      const response = await this.sheetsAPI.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range: `${sheetName}!A1`,
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        resource: { values: [rowData] },
        auth: this.auth
      });

      console.log("Datos añadidos correctamente:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error al añadir datos:", error);
      throw error;
    }
  }
}

/** Función principal para añadir datos a la hoja */
const appendToSheet = async (data) => {
  try {
    // Crear instancia del cliente con la configuración
    const sheetsClient = new GoogleSheetsClient({
      clientEmail: config.GOOGLE_SHEETS.CLIENT_EMAIL,
      privateKey: config.GOOGLE_SHEETS.PRIVATE_KEY,
      spreadsheetId: config.GOOGLE_SHEETS.SPREADSHEET_ID
    });

    const sheetName = 'reservas';

    // Verificar y preparar la hoja
    const isSheetReady = await sheetsClient.verifyOrCreateSheet(sheetName);

    if (!isSheetReady) {
      return 'Error al preparar la hoja';
    }

    // Añadir los datos a la hoja
    await sheetsClient.appendRow(sheetName, data);
    return 'Datos correctamente agregados';

  } catch (error) {
    console.error("Error completo:", error);
    return 'Error al procesar los datos';
  }
};

export default appendToSheet;
