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

  static on<T extends IpcRenderToMainKey>(
    key: T,
    callback: (event: IpcMainEvent, args: Parameters<IpcRenderToMain[T]>) => void,
  ) {
    ipcMain.on(key, callback);
    return () => ipcMain.removeListener(key, callback);
  }

  static once<T extends IpcRenderToMainKey>(
    key: T,
    callback: (event: IpcMainEvent, args: Parameters<IpcRenderToMain[T]>) => void,
  ) {
    ipcMain.once(key, callback);
  }

  static handle<T extends IpcRenderToMainInvokeKey>(
    key: T,
    callback: (
      event: IpcMainInvokeEvent,
      ...args: Parameters<IpcRenderToMainInvoke[T]>
    ) => ReturnType<IpcRenderToMainInvoke[T]>,
  ) {
    // @ts-ignore
    ipcMain.handle(key, callback);
  }
}
