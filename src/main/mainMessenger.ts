import {
  IpcMainToRender,
  IpcMainToRenderKey,
  IpcRenderToMain,
  IpcRenderToMainInvoke,
  IpcRenderToMainInvokeKey,
  IpcRenderToMainKey,
} from 'common/ipc';
import {BrowserWindow, ipcMain, IpcMainEvent, IpcMainInvokeEvent} from 'electron';

export abstract class MainMessenger {
  private static mainWindow: BrowserWindow | null = null;

  static init(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
  }

  static send<T extends IpcMainToRenderKey>(key: T, ...args: Parameters<IpcMainToRender[T]>) {
    this.mainWindow?.webContents.send(key, ...args);
  }

  static on<T extends IpcRenderToMainKey>(key: T, callback: (args: Parameters<IpcRenderToMain[T]>) => void) {
    const listener = (_: IpcMainEvent, args: Parameters<IpcRenderToMain[T]>) => {
      callback(args);
    };
    ipcMain.on(key, listener);
    return () => ipcMain.removeListener(key, listener);
  }

  static once<T extends IpcRenderToMainKey>(key: T, callback: (args: Parameters<IpcRenderToMain[T]>) => void) {
    const listener = (_: IpcMainEvent, args: Parameters<IpcRenderToMain[T]>) => {
      callback(args);
    };
    ipcMain.once(key, listener);
  }

  static handle<T extends IpcRenderToMainInvokeKey>(
    key: T,
    callback: (...args: Parameters<IpcRenderToMainInvoke[T]>) => ReturnType<IpcRenderToMainInvoke[T]>,
  ) {
    const listener = (_: IpcMainInvokeEvent, ...args: Parameters<IpcRenderToMainInvoke[T]>) => {
      return callback(...args);
    };

    // @ts-ignore
    ipcMain.handle(key, listener);
  }
}
