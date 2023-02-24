import { Divider, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Menu, MenuItem } from '@mui/material';
import { styled } from '@mui/system';
import { SettingsManager } from "@poe-companion/settings-manager";
import { ask, confirm, open } from '@tauri-apps/api/dialog';
import { listen } from '@tauri-apps/api/event';
import { appWindow } from '@tauri-apps/api/window';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { info } from "tauri-plugin-log-api";
import { LangugeSelector } from './components/LangugeSelector';
import { SelectPathToFile } from './components/SelectPathToFile';
import { ShortcutsManager } from './components/ShortcutsManager';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';



const listenToMouse = async () => {

  const unlisten = await listen<string>('mouse-move', (event) => {
    console.log(`Got error in window ${event.windowLabel}, payload: ${event.payload}`);
  });
}

export function App() {
  const { t, i18n } = useTranslation();
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleDrag = (e: DraggableEvent, data: DraggableData) => {
    info(`${data.x} ${data.y}`)
    setPosition({ x: data.x, y: data.y });
  };



  useEffect(() => {
    info("Component Load")
    SettingsManager.get("startAtBoot").then((startAtBoot) => {
      console.log("startAtBoot", startAtBoot)
    })

    SettingsManager.get("windows").then((windows) => {
      const main = windows.find((win) => win.name === "main")
      console.log("windows", main)

      if (main) {
        setPosition({ x: main.relative_x, y: main.relative_y })
      }
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
    <div>
      {t("title")}
      <MyThemeComponent className="some-class">This is hotpink now! AFFIL affil</MyThemeComponent>

      <Divider style={{ margin: "5px" }} />

      <LangugeSelector />

      <Divider style={{ margin: "5px" }} />

      <ShortcutsManager />

      <Divider style={{ margin: "5px" }} />

      <SelectPathToFile />

      <div>
        <List>
          <ListItem button onClick={handleItemClick}>
            <ListItemText primary="Item 1" />
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={handleItemClick}>
                A
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem button onClick={handleItemClick}>
            <ListItemText primary="Item 2" />
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={handleItemClick}>
                A
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem button onClick={handleItemClick}>
            <ListItemText primary="Item 3" />
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={handleItemClick}>
                A
                {/* <MoreVertIcon /> */}
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
          <MenuItem onClick={handleMenuClose}>Start</MenuItem>
        </Menu>
      </div>

      <div style={{ width: '500px', height: '500px' }}>
        <Draggable
          handle=".handle"
          defaultPosition={{ x: 0, y: 0 }}
          position={position}
          onStop={handleDrag}
        >
          <div className="handle" style={{ width: '50px', height: '50px', backgroundColor: 'blue' }}>
            Drag me around
          </div>
        </Draggable>
      </div>

    </div >
  );
}

export default App;
