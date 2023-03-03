import { Divider, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Menu, MenuItem } from '@mui/material';
import { styled } from '@mui/system';
import { SettingsManager } from "@poe-companion/settings-manager";
import { ask, confirm, open } from '@tauri-apps/api/dialog';
import { listen } from '@tauri-apps/api/event';
import { appWindow } from '@tauri-apps/api/window';
import { useEffect, useState } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { useTranslation } from 'react-i18next';
import { info } from "tauri-plugin-log-api";
import { LangugeSelector } from './components/LangugeSelector';
import { SelectPathToFile } from './components/SelectPathToFile';
import { ShortcutsManager } from './components/Shortcuts/ShortcutsManager';

import { watch, watchImmediate } from "tauri-plugin-fs-watch-api";
import { readTextFile, BaseDirectory } from '@tauri-apps/api/fs';
import { invoke } from '@tauri-apps/api';
import Listings from './components/ListingNotifications/Listings';
import { ChatNotificationsMenu } from './components/ListingNotifications/ChatNotificationsMenu';





export function App() {
  const { t, i18n } = useTranslation();
  const [position, setPosition] = useState({ x: 0, y: 0 });

  function handleDrag(e: DraggableEvent, data: DraggableData) {
    info(`${data.x} ${data.y}`)
    setPosition({ x: data.x, y: data.y });

  }


  useEffect(() => {
    info("Main Component Load")
    // SettingsManager.get("windows").then((windows) => {
    //   const main = windows.find((win) => win.name === "main")
    //   console.log("windows", main)
    //
    //   if (main) {
    //     setPosition({ x: main.relative_x, y: main.relative_y })
    //   }
    // })

    appWindow.setIgnoreCursorEvents(false).then(() => {
      info("Trans")
    })
    appWindow.listen<string>('state-changed', (event) => {
      console.log(`Got error: ${event}`);
    }).then(() => {
      info("listener")
    })

  }, [])

  const doStuff = async () => {

    const yes = await ask('Are you sure?', 'Tauri');
    const yes2 = await ask('This action cannot be reverted. Are you sure?', { title: 'Tauri', type: 'warning' });

    const confirmed = await confirm('Are you sure?', 'Tauri');
    const confirmed2 = await confirm('This action cannot be reverted. Are you sure?', { title: 'Tauri', type: 'warning' });

    info(`${yes}, ${yes2} ${confirmed} ${confirmed2}`);

    info("A");
  }

  const [anchorEl, setAnchorEl] = useState(null);

  const handleItemClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    console.log(position)

  }, [position])

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {/* {t("title")} */}
      {/* <Listings /> */}
      {/* <MyThemeComponent className="some-class">This is hotpink now! AFFIL affil</MyThemeComponent> */}
      {/**/}
      {/* <Divider style={{ margin: "5px" }} /> */}
      {/**/}
      {/* <LangugeSelector /> */}
      {/**/}
      {/* <Divider style={{ margin: "5px" }} /> */}
      {/**/}
      {/* <ShortcutsManager /> */}
      {/**/}
      {/* <Divider style={{ margin: "5px" }} /> */}
      {/**/}
      {/* <SelectPathToFile /> */}

      {/* <div> */}
      {/*   <List> */}
      {/*     <ListItem button onClick={handleItemClick}> */}
      {/*       <ListItemText primary="Item 1" /> */}
      {/*       <ListItemSecondaryAction> */}
      {/*         <IconButton edge="end" onClick={handleItemClick}> */}
      {/*           A */}
      {/*         </IconButton> */}
      {/*       </ListItemSecondaryAction> */}
      {/*     </ListItem> */}
      {/*     <ListItem button onClick={handleItemClick}> */}
      {/*       <ListItemText primary="Item 2" /> */}
      {/*       <ListItemSecondaryAction> */}
      {/*         <IconButton edge="end" onClick={handleItemClick}> */}
      {/*           A */}
      {/*         </IconButton> */}
      {/*       </ListItemSecondaryAction> */}
      {/*     </ListItem> */}
      {/*     <ListItem button onClick={handleItemClick}> */}
      {/*       <ListItemText primary="Item 3" /> */}
      {/*       <ListItemSecondaryAction> */}
      {/*         <IconButton edge="end" onClick={handleItemClick}> */}
      {/*           A */}
      {/*           {/* <MoreVertIcon /> */}
      {/*         </IconButton> */}
      {/*       </ListItemSecondaryAction> */}
      {/*     </ListItem> */}
      {/*   </List> */}
      {/*   <Menu */}
      {/*     anchorEl={anchorEl} */}
      {/*     open={Boolean(anchorEl)} */}
      {/*     onClose={handleMenuClose} */}
      {/*     anchorOrigin={{ vertical: "top", horizontal: "right" }} */}
      {/*     transformOrigin={{ vertical: "top", horizontal: "right" }} */}
      {/*   > */}
      {/*     <MenuItem onClick={handleMenuClose}>Delete</MenuItem> */}
      {/*     <MenuItem onClick={handleMenuClose}>Start</MenuItem> */}
      {/*   </Menu> */}
      {/* </div> */}
      {/**/}
      <Draggable
        handle=".handle"
        defaultPosition={{ x: 0, y: 0 }}
        position={position}
        onStop={handleDrag}
      >
        <div className="handle" style={{ width: "100%" }} >
          <ChatNotificationsMenu />
        </div>
      </Draggable>
    </div >
  );
}

export default App;
