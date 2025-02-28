import whatsappService from '../whatsappService.js';

export  async function sendPricesAndServicesButtons(to) {
    const menuMessage = 'Escoge una de las opciones';
    const buttons = [
      {
        type: 'reply', reply: {id: 'precios', title: 'Precios'}
      },
      {
        type: 'reply', reply: {id: 'servicios', title: 'servicios'}
      },
    ];

    await whatsappService.sendInteractiveButtons(to, menuMessage, buttons);
  }


