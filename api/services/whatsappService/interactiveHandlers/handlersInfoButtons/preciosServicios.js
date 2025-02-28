import { sendPricesAndServicesButtons } from '../../buttons/sendPricesAndServicesButtons.js'

export default async function preciosServiciosHandler(to) {
  await sendPricesAndServicesButtons(to);
}
