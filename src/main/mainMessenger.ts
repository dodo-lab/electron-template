import {IpcMainToRender, IpcMainToRenderKey, IpcRenderToMain, IpcRenderToMainKey} from 'common/ipc';
import {BrowserWindow, ipcMain, IpcMainEvent} from 'electron';

export abstract class MainMessenger {
  private static mainWindow: BrowserWindow | null = null;

  static init(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
  }

  static send<T extends IpcMainToRenderKey>(key: T, ...args: Parameters<IpcMainToRender[T]>) {
    this.mainWindow?.webContents.send(key, ...args);
  }

  static on<T extends IpcRenderToMainKey>(
    key: T,
    callback: (event: IpcMainEvent, args: Parameters<IpcRenderToMain[T]>) => void,
  ) {
    ipcMain.on(key, callback);
    return () => ipcMain.removeListener(key, callback);
  }
}
