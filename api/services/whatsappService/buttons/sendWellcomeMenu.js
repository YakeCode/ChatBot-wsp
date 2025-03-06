import whatsappService from '../whatsappService.js';

// Menú principal de bienvenida
export async function sendWellcomeMenu(to) {
  const menuMessage = '¿En que puedo ayudarte hoy?';
  const buttons = [
    {
      type: 'reply', reply: { id: 'info', title: 'Info & Servicios' }
    },
    {
      type: 'reply', reply: { id: 'mensaje', title: 'Déjame un mensaje' }
    },
    {
      type: 'reply', reply: { id: 'reserva', title: 'Separa una cita' }
    },
  ];

  await whatsappService.sendInteractiveButtons(to, menuMessage, buttons);
}




