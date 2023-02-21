import { Divider, TextField } from '@mui/material';
import { styled } from '@mui/system';
import { core } from "@poe-companion/core";
import { SettingsManager } from "@poe-companion/settings-manager";
import { ask, confirm, open } from '@tauri-apps/api/dialog';
import { listen } from '@tauri-apps/api/event';
import { appWindow } from '@tauri-apps/api/window';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { info } from "tauri-plugin-log-api";
import { LangugeSelector } from './components/LangugeSelector';
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


  core();

  const Button = styled('button')({
    color: 'darkslategray',
    backgroundColor: 'aliceblue',
    padding: 8,
    borderRadius: 4,
  });

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

    const selected = await open({
      multiple: true,
      filters: [{
        name: 'Image',
        extensions: ['png', 'jpeg']
      }]
    });
    if (Array.isArray(selected)) {
      // user selected multiple files
    } else if (selected === null) {
      // user cancelled the selection
    } else {
      // user selected a single file
    }
    info(`${selected}`);

    info("A");
  }



  return (
    <div
      onMouseEnter={() => info("enter")}
      onMouseLeave={() => info("leave")}>
      {t("title")}
      <p>{t('title', { name: 'John' })}</p>
      <MyThemeComponent className="some-class">This is hotpink now! AFFIL affil</MyThemeComponent>

      <Divider style={{ margin: "5px" }} />

      <LangugeSelector />

      <Divider style={{ margin: "5px" }} />

      <ShortcutsManager />

      <Divider style={{ margin: "5px" }} />



    </div>
  );
}

export default App;
