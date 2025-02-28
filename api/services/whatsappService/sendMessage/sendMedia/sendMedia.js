import whatsappService from '../../whatsappService.js';

// Enviar archivos multimedia
export async function sendMedia(to){
  const mediaUrl = 'https://s3.amazonaws.com/gndx.dev/medpet-file.pdf';
  const caption = '¡Esto es un PDF!';
  const type = 'document';
  await whatsappService.sendMediaMessage( to, type, mediaUrl, caption )
}
    //const mediaUrl = 'https://s3.amazonaws.com/gndx.dev/medpet-audio.aac'
  //const caption= 'Bienvenida'
  //const type = 'audio'

  // const mediaUrl = 'https://s3.amazonaws.com/gndx.dev/medpet-imagen.png';
  // const caption = '¡Esto es una Imagen!';
  // const type = 'image';

  // const mediaUrl = 'https://s3.amazonaws.com/gndx.dev/medpet-video.mp4';
  // const caption = '¡Esto es una video!';
  // const type = 'video';
