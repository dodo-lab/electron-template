import {createRoot} from 'react-dom/client';
import App from './App';
import {RenderMessenger} from './renderMessenger';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(<App />);

// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc-example', arg => {
  // eslint-disable-next-line no-console
  console.log(arg);
});
window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);

const subsc = RenderMessenger.on('sample', (text, count) => {
  console.log('sample', text);
  console.log('sample', count);
});

setInterval(() => {
  RenderMessenger.send('sample', 995, 'renderToMain');
}, 5000);

setTimeout(() => {
  if (subsc !== undefined) {
    console.log('subsc');
    subsc();
  }
}, 1000 * 100);
