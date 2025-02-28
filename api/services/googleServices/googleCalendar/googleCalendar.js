/*import { promises as fs } from 'fs';
import path from 'path';
import process from 'process';
import { authenticate } from '@google-cloud/local-auth';
import { google } from 'googleapis';
import { fileURLToPath } from 'url';

// Obtener __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Si modificas estos ámbitos, elimina token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
// El archivo token.json almacena los tokens de acceso y actualización del usuario,
// y se crea automáticamente cuando el flujo de autorización se completa por primera vez.
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

/**
 * Lee credenciales previamente autorizadas del archivo guardado.
 *
 * @return {Promise<OAuth2Client|null>}
 */
/*
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}
*/

/**
 * Serializa credenciales a un archivo compatible con GoogleAuth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
/*
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}*/

/**
 * Carga o solicita autorización para llamar a las APIs.
 *
 */
/*
async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}*/

/**
 * Lista los próximos 10 eventos en el calendario principal del usuario.
 *@param {google.auth.OAuth2} auth Un cliente OAuth2 autorizado.
 */
/*
async function listEvents(auth) {
  const calendar = google.calendar({version: 'v3', auth});
  const res = await calendar.events.list({
    calendarId: 'primary',
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  });
  const events = res.data.items;
  if (!events || events.length === 0) {
    console.log('No se encontraron próximos eventos.');
    return;
  }
  console.log('Próximos 10 eventos:');
  events.map((event, i) => {
    const start = event.start.dateTime || event.start.date;
    console.log(`${start} - ${event.summary}`);
  });
}

// Ejecutar la aplicación
try {
  const auth = await authorize();
  await listEvents(auth);
} catch (error) {
  console.error(error);
}
*/
