import { Dispatcher } from 'flux';

const dispatcher = new Dispatcher();

window.dispatcher = dispatcher; // for testing

export { dispatcher };
