import {IpcMainToRender, IpcMainToRenderKey, IpcRenderToMain, IpcRenderToMainKey} from 'common/ipc';

export abstract class RenderMessenger {
  static send<T extends IpcRenderToMainKey>(key: T, ...args: Parameters<IpcRenderToMain[T]>) {
    return window.electron.ipcRenderer.send(key, args);
  }

  static on<T extends IpcMainToRenderKey>(key: T, callback: IpcMainToRender[T]) {
    return window.electron.ipcRenderer.on(key, callback);
  }

  static once<T extends IpcMainToRenderKey>(key: T, callback: IpcMainToRender[T]) {
    window.electron.ipcRenderer.once(key, callback);
  }
}
