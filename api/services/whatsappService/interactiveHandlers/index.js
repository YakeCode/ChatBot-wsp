//wellcomeMenu
import infoHandler from './handlersWellcomeMenu/info.js';
import mensajeHandler from './handlersWellcomeMenu/mensaje.js';
import reservaHandler from './handlersWellcomeMenu/reserva.js';
//infoButtons
import preciosServiciosHandler from './handlersInfoButtons/preciosServicios.js';
import horariosHandler from './handlersInfoButtons/horarios.js';
import otrosHandler from './handlersInfoButtons/otros.js';
//Precios y servicios
import pricesHandler from './PricesAndServices/prices.js'

const interactiveHandlers = {
  info: infoHandler,
  mensaje: mensajeHandler,
  reserva: reservaHandler,
 precios_servicios: preciosServiciosHandler,
  horarios: horariosHandler,
  otros: otrosHandler,
  precios: pricesHandler,
};

export default interactiveHandlers;
