import { info } from 'tauri-plugin-log-api';
import { SettingsManager as SM } from 'tauri-settings';

export type SettingsSchema = {
  theme: 'dark' | 'light';
  startAtBoot: boolean;
  logDir: string;
  clientLog: string;
  gameConfig: string;
  windowTitle: string;
  logLevel: string;
  accountName: string;
  language: "en" | "pl";
  version: string;
}

export const DefaultSettings: SettingsSchema = {
  version: "0.0.1",
  language: "en",
  theme: 'light',
  logDir: "",
  startAtBoot: true,
  clientLog: "C:\\Program Files (x86)\\Grinding Gear Games\\Path of Exile\\logs\\Client.txt",
  gameConfig: "C:\\Users\\Kuba\\Documents\\My Games\\Path of Exile\\production_Config.ini",
  windowTitle: "Path of Exile",
  logLevel: "warn",
  accountName: "",
}

export let SettingsManager = new SM<SettingsSchema>(
  DefaultSettings
  ,
  { // options
    fileName: 'settings',
    prettyfi: true,
  }
)

export const init_settings = async () => {
  info("Init SettingsManager")
  await SettingsManager.initialize();
  await SettingsManager.syncCache();
}


init_settings()
