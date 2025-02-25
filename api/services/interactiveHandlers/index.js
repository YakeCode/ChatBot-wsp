//wellcomeMenu
import infoHandler from './handlersWellcomeMenu/info.js';
import soporteHandler from './handlersWellcomeMenu/soporte.js';
import agenteHandler from './handlersWellcomeMenu/agente.js';
//infoButtons
import preciosServiciosHandler from './handlersInfoButtons/preciosServicios.js';
import horariosHandler from './handlersInfoButtons/horarios.js';
import otrosHandler from './handlersInfoButtons/otros.js';

const interactiveHandlers = {
  info: infoHandler,
  soporte: soporteHandler,
  agente: agenteHandler,
 precios_servicios: preciosServiciosHandler,
  horarios: horariosHandler,
  otros: otrosHandler,
};

export default interactiveHandlers;
