import whatsappService from '../whatsappService.js';

// Menú principal de bienvenida
export async function sendWelcomeMenu(to) {
  const menuMessage = '¿En que puedo ayudarte hoy?';
  const buttons = [
    {
      type: 'reply', reply: { id: 'info', title: 'Información FAQ' }
    },
    {
      type: 'reply', reply: { id: 'soporte', title: 'Soporte' }
    },
    {
      type: 'reply', reply: { id: 'agente', title: 'Habla con un agente' }
    },
  ];

  await whatsappService.sendInteractiveButtons(to, menuMessage, buttons);
}


