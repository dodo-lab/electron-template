export type IpcMainToRender = {
  sample: (test: string, count: number) => void;
};
export type IpcMainToRenderKey = keyof IpcMainToRender;
