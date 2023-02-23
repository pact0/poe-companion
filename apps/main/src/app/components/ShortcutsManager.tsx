import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { isRegistered, register, unregister } from '@tauri-apps/api/globalShortcut';
import { info } from 'tauri-plugin-log-api';

export const ShortcutsManager = (props: {}) => {
  const [hotkey, setHotkey] = useState('Ctrl+Alt+Del');

  const mappings = {
    "Ctrl": "CommandOrControl",
  }

  const commonShortcuts = [
    'Ctrl+a',
    'Ctrl+c',
    'Ctrl+x',
    'Ctrl+v',
    'Ctrl+z',
    'Ctrl+Shift+z',
    'Ctrl+y',
    'Ctrl+f',
    'Ctrl+g',
    'Ctrl+h',
    'Ctrl+i',
    'Ctrl+j',
    'Ctrl+k',
    'Ctrl+l',
    'Ctrl+m',
    'Ctrl+n',
    'Ctrl+o',
    'Ctrl+p',
    'Ctrl+q',
    'Ctrl+s',
    'Ctrl+t',
    'Ctrl+u',
    'Ctrl+w',
    'Ctrl+x',
    'Ctrl+y',
    'Ctrl+z',
    'Shift+Insert',
    'Shift+Delete',
    'Ctrl+Insert',
    'Ctrl+Delete',
    'Alt+Tab',
    'Alt+F4',
    'Windows+L',
    'F5', 'F11', 'Ctrl+R', 'Ctrl+Shift+R'
  ];

  useEffect(() => {
    const a = async () => {
      const isregistered: any = await isRegistered('CommandOrControl+P');
      info(`is regsitered ${isregistered}`)
      await register('CommandOrControl+P', () => {
        info('Control+P Shortcut triggered');
      });
    }

    a()
  }, [])
  const handleHotkeyChange = (event: any) => {
    setHotkey(event.target.value);
  };

  const handleHotkeyKeyPress = async (event: any) => {
    event.preventDefault(); // prevent default browser behavior
    const newHotkey = getHotkeyFromEvent(event);
    info(`NewHotkey ${newHotkey} is in ${commonShortcuts.includes(newHotkey)} `)
    if (newHotkey && !(commonShortcuts.includes(newHotkey))) {
      const tauriNamingHotkey = newHotkey.replace("Ctrl", mappings["Ctrl"])
      const isAlreadyRegistered = await isRegistered(tauriNamingHotkey);
      info(`Is already registered ${isAlreadyRegistered}`)
      await unregister(newHotkey)

      await register(tauriNamingHotkey, () => {
        info(`New hotkey is ${tauriNamingHotkey}`);
      });
      setHotkey(newHotkey);
    }
  };

  const getHotkeyFromEvent = (event: any) => {
    const key = event.key;
    info(`KEY ${key}`)
    const ctrlKey = event.ctrlKey || event.metaKey;
    const altKey = event.altKey;
    const shiftKey = event.shiftKey;
    const isFKey = key.startsWith("F") && key.length > 1;
    const FKey = isFKey ? key : "";
    if (key === 'Control' || key === 'Meta' || key === 'Shift' || key === 'Alt') {
      return null; // ignore control/meta/shift/alt key press
    }

    if (key && (ctrlKey || altKey || shiftKey)) {
      const modifiers = [];
      if (ctrlKey) modifiers.push('Ctrl');
      if (altKey) modifiers.push('Alt');
      if (shiftKey) modifiers.push('Shift');
      const hotkey = modifiers.join('+') + (modifiers.length > 0 ? '+' : '') + key;
      return hotkey;
    }
    if (key === ' ') {
      return 'Space'; // use "Space" instead of spacebar key
    }
    return key;
  };

  return (
    <div>
      <TextField
        label="Show app hotkey"
        value={`${hotkey}`}
        onKeyDown={handleHotkeyKeyPress}
        onChange={handleHotkeyChange}
        margin="normal"
        variant="outlined"
        style={{ caretColor: "transparent", userSelect: "none" }}
      />
    </div>
  )
}
