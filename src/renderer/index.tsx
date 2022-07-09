import {createRoot} from 'react-dom/client';
import App from './App';
import {RenderMessenger} from './renderMessenger';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(<App />);

const subsc = RenderMessenger.on('sample', (text, count) => {
  console.log('sample', text);
  console.log('sample', count);
});

RenderMessenger.once('sample', (text, count) => {
  console.log('once', text);
  console.log('once', count);
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

setTimeout(async () => {
  const text = await RenderMessenger.invoke('sample', true, 555);
  console.log('invoke', text);
}, 800);
