import Mustache from "mustache";
import Contact from "../models/Contact";
import Ticket from "../models/Ticket";

export const greeting = (): string => {
  const greetings = ["Buen dia", "Buenos dias", "Buenas tardes", "Buenas noches"];
  const h = new Date().getHours();
  // eslint-disable-next-line no-bitwise
  return greetings[(h / 6) >> 0];
};

export default (body: string, contact: Contact, ticket?: Ticket): string => {
  let ms = "";

  const Hr = new Date();

  const dd: string = `0${Hr.getDate()}`.slice(-2);
  const mm: string = `0${Hr.getMonth() + 1}`.slice(-2);
  const yy: string = Hr.getFullYear().toString();
  const hh: number = Hr.getHours();
  const min: string = `0${Hr.getMinutes()}`.slice(-2);
  const ss: string = `0${Hr.getSeconds()}`.slice(-2);

  if (hh >= 6) {
    ms = "Buenos dias";
  }
  if (hh > 11) {
    ms = "Buenas tardes";
  }
  if (hh > 17) {
    ms = "Buenas noches";
  }
  if (hh > 23 || hh < 6) {
    ms = "Buenos dias";
  }

  const setor =
    ticket?.queueId === undefined || ticket.queueId === null
      ? ""
      : ticket.queue.name;

  const usuario =
    ticket?.userId === undefined || ticket.userId === null
      ? ""
      : ticket.user.name;


  const protocol = yy + mm + dd + String(hh) + min + ss;

  const hora = `${hh}:${min}:${ss}`;

  const view = {
    name: contact ? contact.name : "",
    gretting: greeting(),
    ms,
    protocol,
    hora,
    fila: setor,
    usuario,
  };
  return Mustache.render(body, view);
};
