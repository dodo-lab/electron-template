import {IpcMainToRenderKey, IpcRenderToMainKey} from 'common/ipc';
import {Channels} from 'main/preload';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        sendMessage(channel: Channels, args: unknown[]): void;
        send(channel: IpcRenderToMainKey, args: unknown[]): void;
        on(channel: IpcMainToRenderKey, func: (...args: any[]) => void): (() => void) | undefined;
        once(channel: IpcMainToRenderKey, func: (...args: any[]) => void): void;
      };
    };
  }
}

export {};
