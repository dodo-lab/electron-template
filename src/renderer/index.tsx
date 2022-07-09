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

const subsc = RenderMessenger.on('sample', (test, count) => {
  console.log('sample', test);
  console.log('sample', count);
});

setTimeout(() => {
  if (subsc !== undefined) {
    console.log('subsc');
    subsc();
  }
}, 1000 * 100);
