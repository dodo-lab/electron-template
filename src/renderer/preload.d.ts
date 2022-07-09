import {IpcMainToRenderKey} from 'common/ipc';
import {Channels} from 'main/preload';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        sendMessage(channel: Channels, args: unknown[]): void;
        on(channel: IpcMainToRenderKey, func: (...args: any[]) => void): (() => void) | undefined;
        once(channel: string, func: (...args: unknown[]) => void): void;
      };
    };
  }
}

export {};
