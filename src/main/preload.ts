import {IpcMainToRenderKey} from 'common/ipc';
import {contextBridge, ipcRenderer, IpcRendererEvent} from 'electron';

export type Channels = 'ipc-example';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: IpcMainToRenderKey, func: (...args: any[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: any[]) => func(...args);
      ipcRenderer.on(channel, subscription);

      return () => ipcRenderer.removeListener(channel, subscription);
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
});
