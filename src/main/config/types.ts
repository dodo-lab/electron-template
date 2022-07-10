import {Rectangle} from 'electron';

export type Config = {
  windowRect: Rectangle;
};

export type ConfigKey = keyof Config;
