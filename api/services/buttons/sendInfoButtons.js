import whatsappService from '../whatsappService.js';

export async function sendInfoButtons(to) {
    const menuMessage = 'Escoge una de las opciones';
    const buttons = [
      {
        type: 'reply', reply: {id: 'precios_servicios', title: 'Precios y Servicios'}
      },
      {
        type: 'reply', reply: {id: 'horarios', title: 'Horarios de Atención'}
      },
      {
        type: 'reply', reply: {id: 'otros', title: 'Otros'}
      },
    ];

    await whatsappService.sendInteractiveButtons(to, menuMessage, buttons);
  }
