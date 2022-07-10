import ElectronStore from 'electron-store';
import {Config, ConfigKey} from './types';

const store = new ElectronStore<Config>();

export function saveConfig<T extends ConfigKey>(key: T, value: Config[T]) {
  store.set(key, value);
}

export function loadConfig<T extends ConfigKey>(key: T, defaultValue?: Config[T]) {
  if (store.has(key)) {
    return store.get(key);
  }

  return defaultValue;
}
