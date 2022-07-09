import {IpcMainToRender, IpcMainToRenderKey} from 'common/ipc';

export abstract class RenderMessenger {
  static on<T extends IpcMainToRenderKey>(key: T, callback: IpcMainToRender[T]) {
    return window.electron.ipcRenderer.on(key, callback);
  }
}
