import { sendMedia } from '../../sendMessage/sendMedia/sendMedia.js';

export default async function pricesHandler(to) {
  await sendMedia(to);
}
