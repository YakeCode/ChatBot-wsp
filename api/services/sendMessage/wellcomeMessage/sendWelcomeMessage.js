import whatsappService from '../../whatsappService.js';

export  function isGreeting(message){
  const greetings = ['hola', 'buenas', 'hello', 'hi', 'buenos días', 'buenas tardes', 'buenas noches']
  return greetings.includes(message);
}

function getSenderName(senderInfo) {
  const name = senderInfo.profile?.name;
  if (name) {
    const validNameRegex = /^[\p{L}\s'-]+$/u;
    if (validNameRegex.test(name)) {
      return name.split(/\s+/)[0];
    }
    return "";
  }
  return senderInfo.wa_id || "";
}

export async function sendWelcomeMessage (to, messageId, senderInfo ){
  const name = getSenderName(senderInfo)
  const wellcomemessage =`Bienvenido${name ? ` ${name}` : ''}, te estas comunicando con mis servicios online de desarrollo.`;
  await whatsappService.sendMessage(to, wellcomemessage, messageId)
}
