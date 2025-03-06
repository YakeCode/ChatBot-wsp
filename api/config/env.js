import dotenv from 'dotenv';

dotenv.config();

export default {
  // Configuración de WhatsApp
  WEBHOOK_VERIFY_TOKEN: process.env.WEBHOOK_VERIFY_TOKEN,
  API_TOKEN: process.env.API_TOKEN,
  BUSINESS_PHONE: process.env.BUSINESS_PHONE,
  API_VERSION: process.env.API_VERSION,

  // Configuración del servidor
  PORT: process.env.PORT || 3000,

  // Configuración de Google Sheets
  GOOGLE_SHEETS: {
    TYPE: process.env.GOOGLE_SHEETS_TYPE,
    PROJECT_ID: process.env.GOOGLE_SHEETS_PROJECT_ID,
    PRIVATE_KEY_ID: process.env.GOOGLE_SHEETS_PRIVATE_KEY_ID,
    PRIVATE_KEY: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    CLIENT_EMAIL: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    CLIENT_ID: process.env.GOOGLE_SHEETS_CLIENT_ID,
    AUTH_URI: process.env.GOOGLE_SHEETS_AUTH_URI,
    TOKEN_URI: process.env.GOOGLE_SHEETS_TOKEN_URI,
    AUTH_PROVIDER_CERT_URL: process.env.GOOGLE_SHEETS_AUTH_PROVIDER_X509_CERT_URL,
    CLIENT_CERT_URL: process.env.GOOGLE_SHEETS_CLIENT_X509_CERT_URL,
    SPREADSHEET_ID: process.env.SPREADSHEET_ID
  },

  GOOGLE_CALENDAR: {
    TYPE: process.env.GOOGLE_CALENDAR_TYPE,
    PROJECT_ID: process.env.GOOGLE_CALENDAR_PROJECT_ID,
    PRIVATE_KEY_ID: process.env.GOOGLE_CALENDAR_PRIVATE_KEY_ID,
    PRIVATE_KEY: process.env.GOOGLE_CALENDAR_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    CLIENT_EMAIL: process.env.GOOGLE_CALENDAR_CLIENT_EMAIL,
    CLIENT_ID: process.env.GOOGLE_CALENDAR_CLIENT_ID,
    AUTH_URI: process.env.GOOGLE_CALENDAR_AUTH_URI,
    TOKEN_URI: process.env.GOOGLE_CALENDAR_TOKEN_URI,
    AUTH_PROVIDER_CERT_URL: process.env.GOOGLE_CALENDAR_AUTH_PROVIDER_X509_CERT_URL,
    CLIENT_CERT_URL: process.env.GOOGLE_CALENDAR_CLIENT_X509_CERT_URL
  },

  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY
};
