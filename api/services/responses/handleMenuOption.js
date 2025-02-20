import whatsappService from '../whatsappService.js';
import { sendInfoButtons } from '../buttons/sendInfoButtons.js'
import { sendPricesAndServicesButtons } from '../buttons/sendPricesAndServicesButtons.js'

// Responses

export async function handleMenuOption(to, option) {
  let response;
  switch (option) {
    case 'info':
      await sendInfoButtons(to);
      return;

    case 'soporte':
      response = 'Describe brevemente cual es tu problema';
      break;

    case 'agente':
      response = 'Veo que necesitas ayuda personalizada. ¿Podrías indicarme brevemente cuál es tu consulta?';
      break;

    //2

    case 'precios_servicios':
          await sendPricesAndServicesButtons(to);
          return;

        case 'horarios':
          response = 'Actualmente no tengo un horario fijo, por ende te estaré contactando lo mas pronto posible';
          break;

        case 'otros':
          response = 'Veo que necesitas ayuda personalizada. ¿Podrías indicarme brevemente cuál es tu consulta?';
          break;

    default:
      response = 'Lo siento, no entendí tu selección, Por favor elige una de las opciones del menu.';
  }
  await whatsappService.sendMessage(to, response);
}

