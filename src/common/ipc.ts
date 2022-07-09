export type IpcMainToRender = {
  sample: (text: string, count: number) => void;
};
export type IpcMainToRenderKey = keyof IpcMainToRender;

export type IpcRenderToMain = {
  sample: (count: number, text: string) => void;
};
export type IpcRenderToMainKey = keyof IpcRenderToMain;

export type IpcRenderToMainInvoke = {
  sample: (flag: boolean, count: number) => Promise<string>;
};
export type IpcRenderToMainInvokeKey = keyof IpcRenderToMainInvoke;
