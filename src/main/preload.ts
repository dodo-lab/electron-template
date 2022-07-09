import {IpcMainToRenderKey, IpcRenderToMainKey} from 'common/ipc';
import {contextBridge, ipcRenderer, IpcRendererEvent} from 'electron';

export type Channels = 'ipc-example';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    send(channel: IpcRenderToMainKey, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: IpcMainToRenderKey, func: (...args: any[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: any[]) => func(...args);
      ipcRenderer.on(channel, subscription);

      return () => ipcRenderer.removeListener(channel, subscription);
    },
    once(channel: IpcMainToRenderKey, func: (...args: any[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
});
