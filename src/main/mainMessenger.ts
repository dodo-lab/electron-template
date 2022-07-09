import {IpcMainToRender, IpcMainToRenderKey} from 'common/ipc';
import {BrowserWindow} from 'electron';

export abstract class MainMessenger {
  private static mainWindow: BrowserWindow | null = null;

  static init(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
  }

  static send<T extends IpcMainToRenderKey>(key: T, ...args: Parameters<IpcMainToRender[T]>) {
    this.mainWindow?.webContents.send(key, ...args);
  }
}
