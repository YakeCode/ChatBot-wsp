import { sendInfoButtons } from '../../buttons/sendInfoButtons.js';

export default async function infoHandler(to) {
  await sendInfoButtons(to);
}
