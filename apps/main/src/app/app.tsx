import { Divider } from '@mui/material';
import { styled } from '@mui/system';
import { SettingsManager } from "@poe-companion/settings-manager";
import { ask, confirm, open } from '@tauri-apps/api/dialog';
import { listen } from '@tauri-apps/api/event';
import { appWindow } from '@tauri-apps/api/window';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { info } from "tauri-plugin-log-api";
import { LangugeSelector } from './components/LangugeSelector';
import { SelectPathToFile } from './components/SelectPathToFile';
import { ShortcutsManager } from './components/ShortcutsManager';

const listenToMouse = async () => {

  const unlisten = await listen<string>('mouse-move', (event) => {
    console.log(`Got error in window ${event.windowLabel}, payload: ${event.payload}`);
  });
}

export function App() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    info("Component Load")
    SettingsManager.get("startAtBoot").then((startAtBoot) => {
      console.log("startAtBoot", startAtBoot)
    })

    appWindow.setIgnoreCursorEvents(false).then(() => {
      info("Trans")
    })
    appWindow.listen<string>('state-changed', (event) => {
      console.log(`Got error: ${event}`);
    }).then(() => {
      info("listener")
    })

    listenToMouse();
  }, [])


  const MyThemeComponent = styled('div')(({ theme }) => ({
    color: theme.palette.chip.color,
    '&:hover': {
      background: "#f00",
    },
  }));

  const doStuff = async () => {

    const yes = await ask('Are you sure?', 'Tauri');
    const yes2 = await ask('This action cannot be reverted. Are you sure?', { title: 'Tauri', type: 'warning' });

    const confirmed = await confirm('Are you sure?', 'Tauri');
    const confirmed2 = await confirm('This action cannot be reverted. Are you sure?', { title: 'Tauri', type: 'warning' });

    info(`${yes}, ${yes2} ${confirmed} ${confirmed2}`);

    info("A");
  }



  return (
    <div>
      {t("title")}
      <MyThemeComponent className="some-class">This is hotpink now! AFFIL affil</MyThemeComponent>

      <Divider style={{ margin: "5px" }} />

      <LangugeSelector />

      <Divider style={{ margin: "5px" }} />

      <ShortcutsManager />

      <Divider style={{ margin: "5px" }} />

      <SelectPathToFile />



    </div>
  );
}

export default App;
